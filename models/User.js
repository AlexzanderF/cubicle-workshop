const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 }
});

userSchema.pre('save', (next) => {

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;