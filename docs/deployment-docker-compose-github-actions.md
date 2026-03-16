# BlaBlaLog 部署指南（Docker Compose + GitHub Actions，混合管理模式）

本指南说明如何在已有基础设施（宿主机已安装 nginx 作为网关、MongoDB 数据库）的前提下，将 BlaBlaLog 应用以“混合管理模式”上线：

- 基础设施（nginx、MongoDB）由宿主机直接运维。
- 业务应用容器化，使用 Docker Compose 管理生命周期。
- CI 使用 GitHub 托管 Runner 构建并推送镜像；CD 使用服务器上的自托管 Runner 拉取镜像并以 Compose 发布。

适用对象：希望最小改动接入 CI/CD，同时保持网关与数据库在宿主机侧稳定运行的团队。

---

## 1. 先决条件

- 服务器侧
  - Linux 服务器（推荐 Ubuntu 20.04+）。
  - 已安装并运行：nginx（网关）、MongoDB（默认监听 127.0.0.1:27017）。
  - 安装 Docker 和 Docker Compose v2：
    - 参考官方安装文档或快捷脚本；确保 `docker --version`、`docker compose version` 可用。
  - 计划在服务器放置 Compose 文件位置，例如 `/opt/blablalog/docker-compose.yml`。
  - 推荐安装 GitHub 自托管 Runner（部署阶段执行环境）。

- GitHub 仓库侧
  - 在 Settings → Packages 启用 GitHub Container Registry（GHCR）。
  - 使用默认 `GITHUB_TOKEN` 推送镜像即可（无需额外 PAT）。

---

## 2. 项目结构与运行方式

- 前端：Vue CLI（`front-end/`），构建产物 `dist/`。
- 后端：Express（`back-end/`），启动入口 `node ./bin/www`，默认端口 3000。
- 当前后端集成方式：后端通过 `express.static('./public')` 提供前端静态资源。
- 部署思路：在镜像构建阶段先打包前端，再将 `dist/` 拷贝到后端的 `public/`，容器运行仅启动后端服务。

注意：`back-end/config/db.config.js` 默认连接 `mongodb://127.0.0.1:27017`。为了让容器内访问宿主机 MongoDB，本文采用 `network_mode: host`（Linux 支持）。这样容器中的 `127.0.0.1` 即指向宿主机，从而无需改动现有代码。

---

## 3. Dockerfile（多阶段构建）

将以下 Dockerfile 保存到仓库根目录（与 `front-end/`、`back-end/` 同级）。

```dockerfile
# 构建前端
FROM node:20-alpine AS frontend_builder
WORKDIR /workspace/front-end
COPY front-end/package*.json ./
RUN npm ci
COPY front-end/ ./
RUN npm run build

# 准备后端（生产依赖）
FROM node:20-alpine AS backend_runtime
WORKDIR /workspace/back-end
COPY back-end/package*.json ./
RUN npm ci --omit=dev
COPY back-end/ ./

# 注入前端静态资源到后端
COPY --from=frontend_builder /workspace/front-end/dist ./public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "./bin/www"]
```

---

## 4. docker-compose.yml（仅应用容器）

服务器侧准备文件 `/opt/blablalog/docker-compose.yml`：

```yaml
name: blablalog
services:
  app:
    # CI/CD 推送到 GHCR 的镜像地址（见下文 Actions 配置）
    image: ghcr.io/OWNER/REPO:latest
    container_name: blablalog-app
    restart: unless-stopped
    # 采用宿主网络，以便沿用代码中 127.0.0.1:27017 访问宿主 MongoDB
    network_mode: host
    environment:
      - NODE_ENV=production
      - PORT=3000
    # 如需设置时区或其他环境变量，可在此扩展
```

替换 `ghcr.io/OWNER/REPO:latest`：

- 若仓库地址为 `github.com/acme/blablalog`，则镜像名一般写作 `ghcr.io/acme/blablalog:latest`。

若出于平台或策略无法使用 `network_mode: host`：

- 可将 `db.config.js` 中的 MongoDB 连接地址改为使用宿主别名（例如 `host.docker.internal`）并在 Compose 中添加 `extra_hosts: - "host.docker.internal:host-gateway"`（Linux 需 Docker 20.10+ 支持）。

---

与上文工作流保持一致，镜像名为 `ghcr.io/<owner>/<repo>:latest`，其中 `<owner>/<repo>` 即 GitHub 的 `github.repository` 值。

## 5. nginx 反向代理示例

在宿主 nginx 中新增（或合并到现有站点配置），将流量转发到应用容器监听端口（3000）：

```nginx
server {
    listen 80;
    server_name your.domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

如需 HTTPS，请在此基础上配置证书（例如使用 certbot/ACME）。

---

## 6. GitHub Actions（CI/CD，混合管理）

推荐采用“构建在 GitHub 托管 Runner、部署在服务器自托管 Runner”的方式：

- Job A（构建与推送镜像）：在 `ubuntu-latest` 上执行。
- Job B（部署）：在服务器的自托管 Runner 上执行，使用本地的 `/opt/blablalog/docker-compose.yml` 将镜像拉起。

在仓库中新增工作流文件示例（路径 `.github/workflows/cicd.yml`）：

```yaml
name: CI/CD
on:
  push:
    branches: [ "main" ]

permissions:
  contents: read
  packages: write

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }} # owner/repo

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy:
    needs: build-and-push
    # 自托管 Runner（请在服务器安装并打上合适标签）
    runs-on: [ self-hosted, linux, x64 ]
    steps:
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Pull and up via compose
        run: |
          docker compose -f /opt/blablalog/docker-compose.yml pull
          docker compose -f /opt/blablalog/docker-compose.yml up -d

      - name: Cleanup old images
        run: |
          docker image prune -f
```

如不便安装自托管 Runner，也可在部署 Job 中使用 SSH Action 在 GitHub 托管 Runner 上远程执行 `docker compose`（需配置密钥与白名单）。

---

## 7. 首次上线步骤

1) 服务器端准备

- 创建目录并放置 Compose 文件：`/opt/blablalog/docker-compose.yml`。
- 确认 Docker/Compose、nginx、MongoDB 均正常，可访问。
- 若使用自托管 Runner：
  - 在 GitHub 仓库或组织添加 Runner，部署到服务器，建议打标签 `linux,x64`。

2) 首次构建与部署

- 将上文 Dockerfile 提交到仓库。
- 合并到 `main` 分支后，Actions 会自动：构建镜像 → 推送 GHCR → 在自托管 Runner 上执行 `docker compose up -d`。
- 在宿主 nginx 侧配置反代并重载：`nginx -t && nginx -s reload`。

3) 访问验证

- 通过域名访问 `http://your.domain.com/`，确认页面可打开、接口可用。

---

## 8. 常用运维操作

- 仅更新应用镜像并重启：
  - 在服务器执行 `docker compose -f /opt/blablalog/docker-compose.yml pull && docker compose -f /opt/blablalog/docker-compose.yml up -d`。
- 查看日志：
  - `docker logs -f blablalog-app`。
- 回滚到上一版本：
  - 将 Compose 中镜像标签从 `latest` 改为指定的 SHA 标签；或在 Actions 中手动触发部署到指定 Tag。

---

## 9. 安全与后续优化建议

- 秘钥与配置
  - 代码库中的 MinIO 凭证、MongoDB 地址可逐步外置为环境变量，并在容器启动时注入。
  - 结合仓库 Environments 与机密变量进行分环境发布。

- 健康检查与监控
  - 建议为后端增加健康检查接口，并在 Compose 中添加 `healthcheck`。
  - 配合 Prometheus/Grafana 或云监控平台做基础监控与告警。

- 零停机优化
  - 需要更强可用性时，可引入并行容器、蓝绿/金丝雀发布策略，或迁移至编排平台（如 k8s）。

---

## 10. 常见问题

- 容器无法连接 MongoDB（ECONNREFUSED 127.0.0.1:27017）
  - 使用了默认 `db.config.js` 且未开启 `network_mode: host`。请在 Compose 中启用 `network_mode: host`，或调整连接地址与 `extra_hosts`。

- nginx 代理后页面空白或静态资源 404
  - 确认 Dockerfile 已将前端 `dist/` 拷贝至后端 `public/`，并且容器内 `/workspace/back-end/public` 下存在构建产物。

- 推送 GHCR 失败（denied: permission）
  - 检查工作流 `permissions.packages: write` 是否配置；或使用 PAT 并保存到仓库机密。

---

以上即为在“混合管理模式”下，结合 Docker Compose 与 GitHub Actions 的完整部署方案。如果希望我将上述示例文件（Dockerfile、工作流）直接提交到仓库，请告知分支与偏好路径。 

