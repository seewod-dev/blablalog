var express = require('express');
const multer  = require('multer')
const JWT = require("../util/JWT")
var router = express.Router();
const diaryController = require('../controller/diary');
const panelController = require('../controller/panel');
const hefengController = require('../controller/hefeng');
const minioController = require('../controller/minio');

const upload = multer({ dest: 'public/avataruploads/' })
const upload_photo = multer({ dest: 'public/photo/' })

//非login路由（保护数据安全）
router.use((req,res,next) =>{
  //如果授权有效 next
  const token = req.headers["authorization"].split(" ")[1]
  if(token){
    let payload = JWT.verify(token)
    if(payload){
      let newToken = null
      if(payload.autoLogin){
        newToken = JWT.generate({_id:payload._id, email:payload.email, autoLogin:payload.autoLogin}, "30d")
      }else{
        newToken = JWT.generate({_id:payload._id, email:payload.email, autoLogin:payload.autoLogin}, "1h")
      }
      res.header("Authorization",newToken)
      next()
    }else{
        //如果token过期，返回401错误，  未完成 
        res.status(401).send({
            code:"ERROR_TOKEN-EXPIRED",
            msg: "token已过期",
        })
    }
  }
})

//用户信息操作请求
// router.post('/user/updateInfo',upload.single('avatar'),UserController.updateInfo)

//个人面板
router.post('/panel/updateMyPanel',panelController.updateMyPanel)
router.get('/panel/getMyPanel',panelController.getMyPanel)
//个人面板模板
router.get('/panel/getPanelTemplateList',panelController.getPanelTemplateList)

//日记
router.post('/diary/createDiary',diaryController.createDiary)
router.post('/diary/updateDiary',diaryController.updateDiary)
router.post('/diary/getDiary',diaryController.getDiary)
router.get('/diary/getMyDiaryList',diaryController.getMyDiaryList)
//日记模板
router.get('/diary/getDiaryTemplateList',diaryController.getDiaryTemplateList)
//日记个人模板
router.patch('/diary/updateMyDiaryTemplate',diaryController.updateMyDiaryTemplate)
router.get('/diary/getMyDiaryTemplate',diaryController.getMyDiaryTemplate)


//通知相关功能
// router.get('/getNotices',NoticeController.getNotices)


//获取个人位置与天气
router.get('/hefeng/getCityAndWeather',hefengController.getCityAndWeather)

//文件上传相关（生成minIO的预签名URL）
router.get('/minio/getPresignedURL',minioController.getPresignedURL)
router.patch('/panel/uploadPhoto', upload_photo.single('photo'), minioController.uploadPhoto)
// /页面自动登录或者跳转倒登录页面
module.exports = router;