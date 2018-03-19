// Importing needed npm packages
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

var app = express();

// Set up bodyparser to enable access to POST key values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import models
var Document = require('../models/Document.js');
var User = require('../models/User.js');

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

module.exports = app;
