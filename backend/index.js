import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import initializeAuth from './routes/auth'
import databaseAccess from './routes/databaseAccess'
import User from './models/User';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI);

databaseAccess(app);
initializeAuth(app);


//ROUTES ARE HERE

app.post('/login', function(req, res, next) {
	// Do email and password validation for the server
	passport.authenticate("local", function(err, user, info) {

		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })
		}

		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			return res.json({ success: true, message: "authentication succeeded" })
		})
	})(req, res, next)
});

app.get("/logout", function(req, res,next) {
  req.logout()
	return res.json({ success: true })
})

app.post('/register', function(req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
	  console.log(err);
	  console.log(user);
  // is email address already in use?
  if (user) {
  	res.json({ success: false, message: "Email already in use" })
  	return
  }
  // go ahead and create the new user
  else {
  	User.create({username:req.body.username, password: req.body.password }, (err) => {
  		if (err) {
  			console.error(err)
  			res.json({ success: false })
  			return
  		}
  		res.json({ success: true })
  		return
  	})
  }
  })})


app.get('/', function(req,res) {
  if(req.user) {
    res.json()
  } else {
    res.redirect('/login')
  }
});

// All of our routes are in routes.js
// var routes = require('./routes');
// app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
