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
            rawContent: req.body.rawContent
        });

        newDocument.save().then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });

    app.get('/shared', (req, res) =>{
        Document.findOne({_id: req.query.id}).then(response => {
            console.log("Got doc: " + response);

            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    })

    // Enables the end user to grab all todo items in the database
    app.get('/documents', (req, res) => {
        Document.find({owner: req.query.id}).then(response => {
            console.log(response);
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });

    app.get('/update', (req, res) => {
        Document.update({ _id: req.query.id },
            { $set: { rawContent: req.query.currentContent }})
            .then(response => {
                console.log(response);
                res.send(response);
            }).catch(error => {
                res.send(error);
            })
    });

}
