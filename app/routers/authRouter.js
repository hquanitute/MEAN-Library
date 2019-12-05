const router = require('express').Router();
const passport = require('passport');
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const circularJSON = require('circular-json')

let salt = bcrypt.genSaltSync(10);

router.post('/registry', (req, res) => {
  User.create({ username: req.body.username, password: bcrypt.hashSync(req.body.password, salt) }, function (err, result) {
    if (err)
      res.json({status:"fail",message:err});
    else
      res.json({ status: "success", message: "User added successfully!!!", data: null });

  })
})
router.post('/login', (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  User.findOne({ username: req.body.username }, function (err, userInfo) {
    if (err) {
      res.json({ status: "err", message: "Error" })
    } else {
      if(userInfo){
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ info: userInfo }, req.app.get('secretKey'), { expiresIn:  10*60 });
          res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });
        } else {
          res.json({ status: "error", message: "Invalid email/password!!!", data: null });
        }
      }else{
        res.json({status:"Fail",message:"User not found"})
      }
    }
  })
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', function (req, res, next) {
  passport.authenticate('google', function (err, user, info) {
    if (user != null) {
      const token = jwt.sign({info:user} , req.app.get('secretKey'), { expiresIn: 30 });
      res.redirect("http://localhost:3000?token=" + token);
    }

  })(req, res, next);
});

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['user_friends', 'email'] }));

router.get('/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
    if (user != null) {
      console.log("xxx"+user);
      const token = jwt.sign({info:user}, req.app.get('secretKey'), { expiresIn: 30 });
      res.redirect("http://localhost:3000?token=" + token);
    }

  })(req, res, next);
});

module.exports = router;