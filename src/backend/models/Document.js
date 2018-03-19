const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: String,
    password: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
