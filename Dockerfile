FROM node:20-alpine AS frontend_builder
WORKDIR /workspace/front-end
COPY front-end/package*.json ./
RUN npm ci
COPY front-end/ ./
RUN npm run build

FROM node:20-alpine AS backend_runtime
WORKDIR /workspace/back-end
COPY back-end/package*.json ./
RUN npm ci --omit=dev
COPY back-end/ ./
COPY --from=frontend_builder /workspace/front-end/dist ./public
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "./bin/www"]
