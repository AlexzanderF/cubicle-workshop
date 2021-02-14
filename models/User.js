const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.isNew) return next();
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.post('save', function (err, doc, next) {
    if (err.name === 'MongoError' && err.code === 11000) {
        next(new Error('Username already exists'));
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;