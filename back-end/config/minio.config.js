const MinIO = require('minio');
const bucketName = "blablalog"
const photoPath = 'photo/'
// 初始化 MinIO 客户端
const minioClient = new MinIO.Client({
  endPoint: "yinghuonet.com",  // 或 "192.168.1.100"
  port: 9000,
  useSSL: false,
  accessKey: 'Yx9wEEwYrZH9JUcbnqTJ',
  secretKey: 'g7s6SFNST6nwYsKdHmB8CZ8BsvvK5ZLA2iSbh4tx'
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