// Importing needed npm packages
const express = require('express');
import mongoose from 'mongoose'

//Checks for mongo database environmental variables
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
//displays if connection was successful server-side
mongoose.connection.on('connected', function() {
    console.log('Success: connected to MongoDb!');
});
//displays if connection failed: server-side
mongoose.connection.on('error', function() {
    console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
    process.exit(1);
});

//Exports function for all login and registration authenication
export default function databaseAccess(app) {
    // Set up bodyparser to enable access to POST key values
    // Import models
    var Document = require('../models/Document.js');
    var User = require('../models/User.js');

    //Database endpoints add, share, update, and documents
    // Enables the end user to create a new todo item in the database
    app.post('/add', (req, res) => {
        const newDocument = new Document({name: req.body.name, owner: req.body.owner._id, content: req.body.content, rawContent: req.body.rawContent, history: []});

        newDocument.save().then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });
    //shared endpoint that finds the document to display for initial collaborators
    app.get('/shared', (req, res) =>{
        Document.findOne({_id: req.query.id}).then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    })
    //Document endpoint that searches for all documents to be returned per user
    app.get('/documents', (req, res) => {
        Document.find({owner: req.query.id}).sort('-date').then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });
    //Collab endpoint Looks up collaborators 
    app.get('/collabs', (req, res) => {
        Document.find({collaborators: req.query.id}).then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });

    //saves document in the database with new history
    app.post('/update', (req, res) => {
        //Finds the document already created and updates that certain file
        Document.findOneAndUpdate({
            _id: req.body.id
        }, {
            $set: {
                "rawContent": req.body.currentContent,
                "history": req.body.history,
                "collaborators": req.body.collaborators
            }
        }, {
            new: true
        }, function(err, doc) {
            if (err) {
                //happens if document was not found
                console.log("Something wrong when updating data!");
            } else {
                res.send(doc);
            }
        });
    });

}
