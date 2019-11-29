const express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const mail = require('./../../config/mail');

router.post("/", (req, res) => {
    let transporter = nodemailer.createTransport({
    service:"Gmail",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.psw // generated ethereal password
    }});
    let info =  transporter.sendMail({
        from: '"Hiệu trưởng Quân 👻" <siwanlov3yeon@gmail.com>', // sender address
        to: "hquanitute@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
      });
      info.catch(er =>console.log(er))
});

module.exports = router;