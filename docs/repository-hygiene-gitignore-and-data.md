# 仓库忽略与数据管理指引

本指引用于规范需要被 Git 忽略的文件与目录，并说明开发/部署过程中的数据库与上传文件管理方式，防止将大体量数据或敏感信息提交至仓库。

## 1. Git 忽略规则

已在根目录与子项目完善忽略规则：

- 操作系统与编辑器：`.DS_Store`、`Thumbs.db`、`.vscode/`、`.idea/`、`.eslintcache`。
- 依赖与构建产物：`node_modules/`、`dist/`、`coverage/`。
- 日志与调试文件：`*.log`、`npm/yarn/pnpm` 调试日志。
- 环境变量文件：`.env`、`.env.*`（含本地覆盖 `*.local`）。
- 数据与上传目录：`/data/`、`back-end/public/avataruploads/`、`back-end/public/coverImg_uploads/`、`back-end/public/photo/`、`back-end/public/projects/`。

注意：如果以上目录/文件已经被提交过，新增忽略规则不会自动移除追踪。需要执行一次清理：

```bash
git rm -r --cached data back-end/public/avataruploads back-end/public/coverImg_uploads back-end/public/photo back-end/public/projects
git commit -m "chore: remove data and uploads from VCS"
```

## 2. 数据库与数据文件

- 开发与测试数据：全部存放在仓库外部，如仓库根目录旁的 `data/`。根 `.gitignore` 已忽略 `data/`。
- 备份与迁移：使用 `mongodump`/`mongorestore`，将备份目录置于仓库外或单独的备份仓库中。

常用命令：

```bash
# 导出
mongodump --host 127.0.0.1:27017 --db BlaBlaLog --out ./backup/YYYYMMDD

# 恢复
mongorestore --host 127.0.0.1:27017 --nsFrom 'BlaBlaLog.*' --nsTo 'BlaBlaLog.*' ./backup/YYYYMMDD
```

## 3. 用户上传文件

- 动态上传文件目录（头像、封面、照片、项目文件等）不进入版本控制，均由运行环境的持久化卷或对象存储托管。
- 当前目录：`back-end/public/avataruploads/`、`back-end/public/coverImg_uploads/`、`back-end/public/photo/`、`back-end/public/projects/` 已加入忽略。
- 线上部署建议：将这些目录挂载为外部卷（或迁移至对象存储），以避免容器重建时丢失。

## 4. 环境变量与机密

- 开发：在本机创建 `.env` 或 `.env.local` 文件，不提交到仓库（已忽略）。
- 部署（CI/CD）：敏感信息使用平台机密管理（GitHub Actions Secrets/Environments），并在 Compose 或运行环境中注入。
- 示例键位（按需调整）：
  - `MONGO_URI`、`JWT_SECRET`、`MINIO_ENDPOINT`、`MINIO_ACCESS_KEY`、`MINIO_SECRET_KEY`、`MINIO_BUCKET`。

建议逐步将代码中的硬编码机密迁移为读取环境变量的方式，避免泄露风险。

## 5. 本地与线上目录建议

- 本地：
  - `data/`（MongoDB 数据目录或备份目录，已忽略）
  - `uploads/`（如需统一管理本地上传文件，可自定义并忽略）

- 线上：
  - 将上传目录挂载为 Docker 卷或使用对象存储（MinIO、S3）。
  - 数据库数据目录由数据库服务自行管理，代码仓库不保存任何二进制数据。

## 6. 清单复核

新增或引入的工具产生的以下产物，按需加入忽略：

- 覆盖率与报告：`coverage/`、`.nyc_output/`
- 打包缓存：`cache/`、`.cache/`
- 临时文件：`tmp/`、`temp/`

如需我进一步清理已经提交的历史大文件或敏感信息，请说明分支与偏好策略（例如使用 BFG/历史重写）。

