const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = {
    register: async ({ username, password, repeatPassword }) => {
        try {
            if (!username || !password || !repeatPassword) {
                throw new Error('Fill all input fields!');
            }
            if (!/[A-Z]/g.test(username[0])) {
                throw new Error('Username must start with uppercase!');
            }
            if (password !== repeatPassword) {
                throw new Error('Passwords doesn\'t match!');
            }
            // password hashing is done by mongoose .pre(save) hook
            return new User({ username, password }).save();
        } catch (error) {
            throw error;
        }
    },

    login: async ({ username, password }) => {
        try {
            const user = await User.findOne({ username }).lean();
            if (!user) throw new Error('Invalid username!');

            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new Error('Invalid password!');

            const token = jwt.sign({ id: user._id, username: user.username }, 'verySecretSecret');

            return token;
        } catch (error) {
            console.log(error);
        }
    }
};