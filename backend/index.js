import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import initializeAuth from './routes/auth'
import databaseAccess from './routes/databaseAccess'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

databaseAccess(app);

initializeAuth(app);

// All of our routes are in routes.js
// var routes = require('./routes');
// app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);

mongoose.connect(process.env.MONGODB_URI);
