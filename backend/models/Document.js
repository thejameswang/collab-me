//required packages
const mongoose = require('mongoose');
//Database mongoose connection
let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

//documentSchema
//name: name of the document DONE
//passord: document password is unused currently
//owner: one user is possible DONE
//collaborators: are still required to be inputted
//Content: the words in the document DONE
//rawContent: the words and the styling of the document DONE
//history: the history is an array of objects that contain the differences and users who created the changes
const documentSchema = new mongoose.Schema({
    name: String,
    password: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    content: String,
    rawContent: String,
    history: Array
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
