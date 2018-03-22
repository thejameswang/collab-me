// Importing needed npm packages
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import initializeAuth from './routes/auth'
import databaseAccess from './routes/databaseAccess'
import socketFile from './routes/socket'
import User from './models/User';
import crypto from 'crypto';
const http = require("http");
const socketIo = require("socket.io");
//initializes express
var app = express();

//initializes bodyparser's required code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//connects mongo server using personal database login from environmental source
mongoose.connect(process.env.MONGODB_URI);

//initializes database routes, connection checks, and connection functions
databaseAccess(app);
//creates secure login and registration of users, including local strategies and serializations
initializeAuth(app, passport);
socketFile(app);

app.post('/login', passport.authenticate('local'), function(req, res) {
    // res.json({ success: true, message: "logged in!" });
    User.findOne({username: req.body.username}).catch(error => {
        res.send(error);
    }).then(response => {
        res.send(response);
    });
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


console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
