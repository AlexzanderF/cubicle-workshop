const userService = require('../services/userService');

module.exports = {
    getLoginForm: (req, res) => {
        res.render('login');
    },

    getRegisterForm: (req, res) => {
        res.render('register');
    },

    loginUser: (req, res) => {

    },

    registerUser: (req, res) => {
        userService.register(req.body)
            .then(() => {
                res.redirect('/login');
            })
            .catch(e => { res.render('register', { error: e }); console.log(e); });
    }
};