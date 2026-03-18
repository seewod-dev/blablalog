"use strict";
const nodemailer = require("nodemailer")
const cfg = require("../config/appConfig")

let transporter = nodemailer.createTransport({
  host: (cfg.smtp && cfg.smtp.host) || "smtp.qq.com",
  port: Number((cfg.smtp && cfg.smtp.port) || 465),
  secure: (cfg.smtp && typeof cfg.smtp.secure !== 'undefined') ? !!cfg.smtp.secure : true,
  auth: {
    user: (cfg.smtp && cfg.smtp.user) || '',
    pass: (cfg.smtp && cfg.smtp.pass) || ''
  }
})

function verCodeSend(mail, code) {
  let mailobj = {
    from: (cfg.smtp && cfg.smtp.from) || '"BlaBlaLog" <no-reply@example.com>',
    to: mail,
    subject: "登陆验证",
    text: `您的验证码是${code}，有效期1分钟`
  }

  return new Promise((reslove, reject) => {
    transporter.sendMail(mailobj, (err, data) => {
      if (err) {
        reject()
      } else {
        reslove()
      }
    })
  })
}

module.exports = { verCodeSend }
