import passport from 'passport'
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);
import { Strategy as LocalStrategy } from "passport-local"
import crypto from 'crypto'


export default function initializeAuth(app) {
  app.use(session({
    secret: process.env.SECRET,
    store: new MongoStore({mongooseConnection: require('mongoose').connection})
  }))

  app.use(passport.initialize());
  app.use(passport.session());

  // PASSPORT LOCALSTRATEGY HERE
  passport.use(new LocalStrategy(function(username, password, done) {
    User.find({username:username}, function(err, user) {
      // console.log(user)
      if(user[0].password===hashPassword(password)) {
        done(null, user[0]);
      } else {
        done(null, false);
      }
    })
    //Look throuhg the passwords.plan/hashed json file
    // for the given username and password
  }))
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(error, result) {
      if(error) {
        res.status(500).send("ID not found")
        done(null, false)
      } else {
        // console.log('hello')
        console.log(result)
        return done(null, result)
      }
    })
  });

}
//helper functions
function hashPassword(password) {
  var hash = crypto.createHash('sha256');
  hash.update(password)
  return hash.digest('hex')
}
