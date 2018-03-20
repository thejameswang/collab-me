const mongoose = require('mongoose');


let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const documentSchema = new mongoose.Schema({
    title: String,
    password: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
