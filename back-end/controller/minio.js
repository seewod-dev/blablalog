const {minioClient,bucketName,photoPath} = require("../config/minio.config")
const panelService= require("../service/panelService")
const path = require('path');

const JWT = require("../util/JWT")

//由于少，本来这些都应该卸载service里面，这里直接在controller中写了，反正hefeng只有这一个
const minioController = {
    getPresignedURL:async (req, res) => {
        try {
            const { fileName, fileType } = req.body;
            
            if (!fileName || !fileType) {
            return res.status(400).json({ error: 'fileName and fileType are required' });
            }

            // 生成唯一对象名（可根据业务需求调整）
            const objectName = `${Date.now()}-${fileName}`;
            
            // 生成预签名 URL（有效期1小时）
            const presignedUrl = await minioClient.presignedPutObject(
                'your-bucket-name',
                objectName,
                60 * 60, // 有效期（秒）
                { 'Content-Type': fileType }
            );

            res.send({
                code:"SUCCESS_GET-CITY AND WEATHER",
                msg: "获取城市与天气成功",
                data: {
                    presignedUrl,
                    objectName,
                    publicUrl: `https://minio.example.com/your-bucket-name/${objectName}`
                }
            })


        } catch (err) {
            console.error('Error generating presigned URL:', err);
            res.status(500).json({ error: 'Failed to generate presigned URL' });
        }

    },
    uploadPhoto:async (req, res)=>{
        let {_id:userId} = JWT.getPayload(req.headers["authorization"].split(" ")[1])
        console.log(req.file)
        let objectName = `${photoPath}${req.file.filename}`
        let localPath = req.file?path.join(__dirname, '..','public', 'photo', req.file.filename):''
        console.log(photoPath)

        try {
            const etag = await minioClient.fPutObject(bucketName, objectName, localPath);
            console.log('文件上传成功！ETag:', etag);

            await panelService.updatePanel({userId, newPanelData: `http://yinghuonet.com:9000/blablalog/photo/${req.file.filename}`, type: 'photo'})

        } catch (err) {
            console.error('上传失败:', err);
        }

        res.send({
            code:"SUCCESS_MODIFY",
            msg: "项目同步成功",
            data: {photo: `http://yinghuonet.com:9000/blablalog/photo/${req.file.filename}`}
        })
    },
    //生成预签名
    getPresignedPutObject:async (req, res)=>{
        const presignedUrl = await minioClient.presignedPutObject(bucketName, objectName, 24*60*60)
        return presignedUrl
    }
}
module.exports = minioController