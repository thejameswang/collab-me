// Importing needed npm packages
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);
import {Strategy as LocalStrategy} from "passport-local"
import crypto from 'crypto'
import User from '../models/User';

//Exports function for all login and registration authenication
export default function initializeAuth(app, passport) {
    //helper functions
    //Creates a hash for sha256
    function hashPassword(password) {
        var hash = crypto.createHash('sha256');
        hash.update(password)
        return hash.digest('hex')
    }
    //Creates the sessions
    app.use(session({
        secret: process.env.SECRET,
        store: new MongoStore({mongooseConnection: require('mongoose').connection}),
        resave: true,
        saveUninitialized: true
    }))
    //Passport initialization
    app.use(passport.initialize());
    //Creates the sessions with passport authenication
    app.use(passport.session());

    //Look throuhg the passwords.plan/hashed json file
    // for the given username and password
    //Serializes users
    passport.serializeUser(function(user, done) {
        console.log('serialize me')
        done(null, user._id);
    });
    //deserializes users
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(error, result) {
            if (error) {
                res.status(500).send("ID not found")
                done(null, false)
            } else {
                console.log(result)
                return done(null, result)
            }
        })
    });
    //Passport strategy checks your password with the hashed password in the database
    passport.use(new LocalStrategy(function(username, password, done) {
        var hashedPassword = hashPassword(password);
        User.findOne({
            username: username
        }, function(error, user) {
            if (user.password === hashedPassword) {
                console.log("YES a user");
                done(null, user);
            } else {
                console.log("NOT a user");
                done(null, false);
            }
        });
    }));
}
