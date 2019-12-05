const express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const mail = require('./../../config/mail');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);

const VERIFY = 1;
const RESETPSW = 2
router.post("/reset", (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.json({ status:"fail",message: err })
    }
    if (user) {
      const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: 24*60*60 });
      sendMailToUser(user, token, RESETPSW).catch(console.error).then(res.json({ status:"success",message: "Please check your mail to reset password" }))
    } else {
      res.json({ status:"fail",message: "Not found user by that email." })
    }
  })
});

router.post("/verify", (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    if(user){
      const token = jwt.sign({ email: req.body.email }, req.app.get('secretKey'), { expiresIn: 24*60*60 });
      sendMailToUser(user, token, VERIFY).then(res.json({message:"check your mail ..."})).catch(console.error)
    }
  })
  
});
router.get("/confirm", (req, res) => {
  jwt.verify(req.query.token, req.app.get('secretKey'), function (err, decoded) {

    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    }
    console.log(decoded);
    if (decoded.email) {
      User.findOne({ email: decoded.email }, (err, user) => {
        user.status = "Active";
        user.save();
      })
    }
  });
});


// async..await is not allowed in global scope, must use a wrapper
async function sendMailToUser(user, token, type) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.psw // generated ethereal password
    }
  });
  console.log(type);
  const front_end_endpoint = "http://localhost:3000/reset?token="
  const back_end_endpoint = "http://localhost:5000/api/emailservice/confirm?token="
  // send mail with defined transport object
  if (type == RESETPSW) {
    let info = await transporter.sendMail({
      from: '"Hiệu trưởng Quân" <serverlibraryute@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Reset Pasword", // Subject line
      text: "Click the below link to reset password", // plain text body
      html: "<b>Remember don't share this link to another people</b><br/>Link: " + front_end_endpoint + token // html body
    })
  }
  if (type == VERIFY) {
    let info = await transporter.sendMail({
      from: '"Hiệu trưởng Quân" <serverlibraryute@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Verify Mail", // Subject line
      text: "Thank you for using our service", // plain text body
      html: "<b>Click the link below to verify</b><br>Link: "+ back_end_endpoint+token
    })
  }
}


  module.exports = router;