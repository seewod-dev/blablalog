var express = require('express');
var router = express.Router();
const UserController = require('../controller/user');

//login路由登陆判断
router.post('/getMailCode', UserController.verifyEmail)
router.post('/verCodeLogin',UserController.verifyLogin_verCode)
router.post('/passwordLogin',UserController.verifyLogin_password)

module.exports = router;