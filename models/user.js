const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Apply passport-local-mongoose plugin for authentication handling
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);