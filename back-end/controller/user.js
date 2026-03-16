const UserService = require("../service/userService");
const panelService = require("../service/panelService");
const myDiaryTemplateService = require("../service/myDiaryTemplateService");
const JWT = require("../util/JWT")

const { verCodeSend } = require('../util/verCodeSend')
let codes = {} // 验证码缓存，暂时先放在内存里

const UserController = {
  //向用户邮箱发送验证信息
  verifyEmail:(req, res) => {
    let { email } = req.body //提取email 账号
    if(email) {
      let code = parseInt( 1000 + Math.random() * 8999 ) // 生成随机验证码
      codes[email] = code
      //发送验证邮件
      verCodeSend(email, code).then(() => {
        //60s后清除验证码
        // setTimeout(()=>{ delete codes[email] }, 60000)
        res.json({
          "code": "SUCCESS_VERIFYCODE_SEND", 
          "message": "验证码发送成功",
        })
      }).catch((err) => {
        res.json({  
          code: 'ERR_VERIFYCODE_FAILSEND',  
          message: '验证码发送失败',  
          data: {  
            email, //引发错误邮件名
            err 
          }  
        });  
      })
    } else {
      res.json({  
        code: 'ERR_EMAIL_ERR',  
        message: 'email参数错误',  
        data: { email }  
      });  
    }
  },
  //用验证信息进行用户登录
  verifyLogin_verCode:async (req,res)=>{
    let { email, verCode, autoLogin} = req.body
    if (email && verCode){
      // 判断验证码是否ok
      if (codes[email] === Number(verCode)) { // 邮箱作为用户名

        let result = await UserService.loginVCode({email})
        //查询成功登录 失败注册并返回用户
        if(!result){
          //注册新用户.账户
          let result_createAccount = await UserService.add({email}) 
          result = await UserService.find({_id: result_createAccount.insertedId})
          //注册新用户.根据默认panelTemplate创建用户的panel
          let result_panelCreate = await panelService.createPanel({userId: result._id}) //排名第一的模板 
          // console.log("注册新用户.根据默认panelTemplate创建用户的panel",result_panelCreate)

          // //注册新用户.根据默认diaryTemplate创建用户的MyDiaryTemplate
          let result_MyDiaryTemplateCreate = await myDiaryTemplateService.createMyDiaryTemplate({userId: result._id}) //排名第一的模板 
          // console.log("注册新用户.根据默认diaryTemplate创建用户的MyDiaryTemplate",result_MyDiaryTemplateCreate)
        }
        //生成token
        let token = null
        if(autoLogin){
          token  = JWT.generate({_id:result._id, email, autoLogin,},"30d")
        }else{
          token  = JWT.generate({_id:result._id, email, autoLogin,},"1h") 
        }
        console.log(result)
        res.header("Authorization",token)
        res.send({
            code:"SUCCESS_VERIFY",
            msg: "验证成功",
            data:{
              _id:result._id, //不需要，后续删除
              email: email,
              name: result.name,
              avatar: result.avatar,
            }
        })

      } else {
        return res.send({err: -1, msg: '参数错误'})
      }
    }else{
      res.send({code: 'ERR_VERIFYCODE_INVALID',  message: '验证码发送失败'})
    }
  },
  verifyLogin_password:async (req,res)=>{
    let { email, password, autoLogin} = req.body
    if (email && password){
      // 判断密码是否ok
      let result = await UserService.loginPassword({email,password})
      if(result){
        let token = null
        if(autoLogin){
          token  = JWT.generate({_id:result._id, email, autoLogin,},"30d")
        }else{
          token  = JWT.generate({_id:result._id, email, autoLogin,},"1h") 
        }

        res.header("Authorization",token)
        res.send({
            code:"SUCCESS_VERIFY",
            msg: "验证成功",
            data:{
              _id:result._id,
              email: email,
              name: result.name,
              avatar: result.avatar,
            }
        })
      } else {
        return res.send({err: -1, msg: '账户名或密码错误'})
      }
    }else{
      res.send({code: 'ERR_PASSWORD_INVALID',  message: '密码发送失败'})
    }
  },
  //用验证信息进行用户登录
  updateInfo:async (req, res)=>{
    const token = req.headers["authorization"].split(" ")[1]
    let payload = JWT.verify(token)

    let info = {...req.body}
    info.avatar = req.file?`/avataruploads/${req.file.filename}`:""
    //过滤掉空的信息
    for(let item in info){
      if(info[item] == ''){
        delete info[item]
      }
    }

    const result = await UserService.update(payload._id, {...info})

    if(info.password){
      delete info.password
    }
    //更新token
    res.send({
      code:"SUCCESS_MODIFY",
      msg: "项目同步成功",
      data:info
    })
  },
}
module.exports = UserController