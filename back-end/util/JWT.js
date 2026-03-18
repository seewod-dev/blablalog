const jsonwebtoken = require("jsonwebtoken")
const cfg = require("../config/appConfig")
const secret = (cfg.jwt && cfg.jwt.secret) || "huohuahua"
const JWT = {
    generate(value,exprires){
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            console.log(e)
            return false
        }
    },
    getPayload(token){
        return this.verify(token)
    }
}

module.exports = JWT
