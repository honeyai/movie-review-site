const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    }, 
    (email, password, done) => {
      console.log("Authenticating Password");
      db.User.findOne({
        where: {
          email: email
        }
      }).then(dbUser => {
        if(!dbUser || !dbUser.validatePassword(password)) {
          return done(null, false, {
            message: "Either your email, password, or both are incorrection."
          });
        }
        console.log("password auth passed.");
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("passport.seralizeUser");
  console.log(`\tuser: ${JSON.stringfy(user)}`);

  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  console.log("passport.deserializeUser");
  console.log(`\tobj: ${JSON.stringify(obj)}`);

  cb(null, obj);
});

module.exports = passport;