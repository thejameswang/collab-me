const mongoose = require('mongoose');

let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
