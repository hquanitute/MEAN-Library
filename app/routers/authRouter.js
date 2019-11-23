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
      next(err);
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
      if (bcrypt.compareSync(req.body.password, userInfo.password)) {
        const token = jwt.sign({ id: userInfo._id, role: userInfo.role }, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });
      } else {
        res.json({ status: "error", message: "Invalid email/password!!!", data: null });
      }
    }
  })
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email','https://www.googleapis.com/auth/plus.login'] }));

// router.get('/google/callback',
//   passport.authenticate('google'),
//   function (accessToken, refreshToken, profile, done) {
//     User.findOne({ googleId: profile.id }, function (err, user) {
//       if (user) {
//         const token = jwt.sign({ id: user._id, role: user.role }, req.app.get('secretKey'), { expiresIn: '1h' });
//         console.log(token);
//         return done(null, { status: "success", message: "user found!!!", data: { user: user, token: token } });
//         // return res.json({ status: "success", message: "user found!!!", data: { user: user, token: token } });
//       }
//       return done(null, false);
//     })
//   });

router.get('/google/callback', function (req, res, next) {

  passport.authenticate('google', function (err, user, info) {
    if (user != null) {
      const token = jwt.sign({ info:user }, req.app.get('secretKey'), { expiresIn: '1h' });
       res.redirect("http://localhost:3000?token=" + token);
    }

  })(req, res, next);
});


module.exports = router;