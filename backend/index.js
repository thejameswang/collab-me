import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import initializeAuth from './routes/auth'
// import databaseAccess from './routes/databaseAccess'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// databaseAccess(app);

if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

// export default function databaseAccess(app) {
  // Set up bodyparser to enable access to POST key values
  // Import models
  var Document = require('./models/Document.js');
  var User = require('./models/User.js');

  // Enables the end user to create a new todo item in the database
  app.post('/add', (req, res) => {
    const newDocument = new Document({
      name: req.body.name,
      password: req.body.password,
      owner: req.body.owner,
      collaborators: req.body.collaborators
    });

    newDocument.save().then(response => {
      res.send(response);
    }).catch(error => {
      res.send(error);
    })
  });

  // Enables the end user to grab all todo items in the database
  app.get('/documents', (req, res) => {
    Document.find().catch(error => {
      res.send(error);
    }).then(response => {
      res.send({documents: response});
    })
  });

// }


initializeAuth(app);

// All of our routes are in routes.js
// var routes = require('./routes');
// app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);

mongoose.connect(process.env.MONGODB_URI);
