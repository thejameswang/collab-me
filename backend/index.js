import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import initializeAuth from './routes/auth'
import databaseAccess from './routes/databaseAccess'
import socketFile from './routes/socket'
import User from './models/User';
import crypto from 'crypto';
const http = require("http");
const socketIo = require("socket.io");



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(process.env.MONGODB_URI);

databaseAccess(app);
initializeAuth(app, passport);
socketFile(app);


app.post('/login', passport.authenticate('local'), function(req, res) {
    // res.json({ success: true, message: "logged in!" });
    User.findOne({username: req.body.username}).catch(error => {
        res.send(error);
    }).then(response => {
        res.send(response);
    });

    // POST: '/login'
    // If login successful --> redirect to homepage
    // Else --> redirect back to login
    //  Do email and password validation for the server
    // passport.authenticate("local", function(err, user, info) {
    // console.log(user);
    // console.log(err);
    // console.log(info);
    // if(err) return next(err)
    // if(!user) {
    // 	return res.json({ success: false, message: info.message })
    // }
    //
    // req.logIn(user, loginErr => {
    // 	if(loginErr) {
    // 		return res.json({ success: false, message: loginErr })
    // 	}
    // 	console.log("authentication succeeds");
    // 	return res.json({ success: true, message: "authentication succeeded" })
    // })
    // })(req, res, next)
});

app.get("/logout", function(req, res) {
    req.logout();
    return res.json({success: true});
})

//helper functions
function hashPassword(password) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

app.post('/register', function(req, res, next) {

    User.findOne({
        username: req.body.username
    }, function(err, user) {
        // is email address already in use?
        if (user) {
            res.json({success: false, message: "Email already in use"})
            // go ahead and create the new user
            return
        } else {
            var hashedPassword = hashPassword(req.body.password);

            User.create({
                username: req.body.username,
                password: hashedPassword
            }, (err) => {
                if (err) {
                    res.json({success: false})
                    return
                }
                res.json({success: true})
                return
            })
        }
    })
})

app.get('/', function(req, res) {
    if (req.user) {
        res.json()
    } else {
        res.redirect('/login')
    }
});



// Sockets



console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
