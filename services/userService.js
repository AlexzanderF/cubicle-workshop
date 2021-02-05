const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    register: async ({ username, password, repeatPassword }) => {
        try {
            if (password !== repeatPassword) {
                throw new Error('Passwords doesn\'t match!');
            }

            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword = await bcrypt.hash(password, salt);

            return new User({ username, password: hashPassword }).save();
        } catch (error) {
            throw error;
        }
    }

};