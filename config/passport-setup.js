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
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "965996379876-pu8nil49feigg1aidurakp05og92v4sk.apps.googleusercontent.com",
    clientSecret: "p-6cmRWxK-lfO7UgoXHoEG38",
    callbackURL: "/auth/google/callback",
    proxy: true
},
function(accessToken, refreshToken, profile, done) {
     User.findOne({ googleId: profile.id }).then(user => {
            if (user != null) {
                 done(null, user);
            } else {
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