const MinIO = require('minio');
const cfg = require("./appConfig")
const bucketName = (cfg.minio && cfg.minio.bucket) || "blablalog"
const photoPath = (cfg.minio && cfg.minio.photoPath) || 'photo/'
const minioClient = new MinIO.Client({
  endPoint: (cfg.minio && cfg.minio.endpoint) || "yinghuonet.com",
  port: Number((cfg.minio && cfg.minio.port) || 9000),
  useSSL: (cfg.minio && typeof cfg.minio.useSSL !== 'undefined') ? !!cfg.minio.useSSL : false,
  accessKey: (cfg.minio && cfg.minio.accessKey) || '',
  secretKey: (cfg.minio && cfg.minio.secretKey) || ''
});

module.exports = {
  minioClient,
  bucketName,
  photoPath
}

// {
//   "url":"http://yinghuonet.com:8088/api/v1/service-account-credentials",
//   "accessKey":"Yx9wEEwYrZH9JUcbnqTJ",
//   "secretKey":"g7s6SFNST6nwYsKdHmB8CZ8BsvvK5ZLA2iSbh4tx",
//   "api":"s3v4",
//   "path":"auto"
// }
