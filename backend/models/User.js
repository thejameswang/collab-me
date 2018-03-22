//Required Packages
const mongoose = require('mongoose');

//userSchema
//Requires a username and password to log in
//username: trivial DONE
//password: trivial DONE 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
      },
     password: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", userSchema);
