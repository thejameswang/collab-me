const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  status: { type: String, required: true }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
