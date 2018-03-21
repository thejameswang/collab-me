// Importing needed npm packages
const express = require('express');
import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
    console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
    console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
    process.exit(1);
});

export default function databaseAccess(app) {
    // Set up bodyparser to enable access to POST key values
    // Import models
    var Document = require('../models/Document.js');
    var User = require('../models/User.js');

    // Enables the end user to create a new todo item in the database
    app.post('/add', (req, res) => {
        const newDocument = new Document({
            name: req.body.name,
            owner: req.body.owner._id,
            content: req.body.content,
            rawContent: req.body.rawContent,
            history: []
        });

        newDocument.save().then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });

    app.get('/shared', (req, res) =>{
        Document.findOne({_id: req.query.id}).then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    })

    // Enables the end user to grab all todo items in the database
    app.get('/documents', (req, res) => {
        Document.find({owner: req.query.id}).then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });

    app.post('/update', (req, res) => {
        console.log(req.body);
        Document.findOneAndUpdate({ _id: req.body.id },
            { $set: {
                "rawContent": req.body.currentContent,
                "history": req.body.history,
                "collaborators": req.body.collaborators }}, { new: true }, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
});
            // .exec(function(err, doc){
            //    if(err) {
            //        res.status(500).send(err);
            //    } else {
            //        console.log(doc);
            //        res.status(200).send(doc);
            //    }
            // });
    });

}
