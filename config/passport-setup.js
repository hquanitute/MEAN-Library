// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('./keys');
// const User = require('./../app/models/author')
// passport.use(new GoogleStrategy({
//     //option for google
//     callbackURL:"http://localhost:3000/auth/google/redirect",
//     clientID:keys.google.clientID,
//     clientSecret:keys.google.clientSecret 
// }), 
//     //passport callback function
//     function(accessToken, refreshToken, profile, cb) {
//         console.log(profile.id);
//       }
// )
const passport = require('passport');
const User = require('./../app/models/user');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callback_url,
    proxy: true
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }).then(user => {
            if (user != null) {
                console.log("User da ton tai");
                done(null, user);
            } else {
                console.log("Tao moi user");
                new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    username: profile.emails[0].value,
                    name: profile.displayName
                }).save().then(user => done(null, user))
            }
        });
        // return done(null, { status: "success", message: "user found!!!", data: { user: user, token: token } });
    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callback_url,
    enableProof: true,
    profileFields: ['id','displayName','email','first_name','last_name','middle_name']
},

    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ facebookId: profile.id }).then(user => {
            if (user != null) {
                done(null, user);
            } else {
                new User({
                    facebookId: profile.id,
                    email: profile.emails[0].value,
                    username: profile.emails[0].value,
                    name: profile.displayName
                }).save().then(user => done(null, user))
            }
        })
    }
)
);
