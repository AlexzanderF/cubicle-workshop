const userService = require('../services/userService');
const { COOKIE_NAME } = require('../config/config');

module.exports = {
    getLoginForm: (req, res) => {
        res.render('login');
    },

    getRegisterForm: (req, res) => {
        res.render('register');
    },

    loginUser: (req, res) => {
        userService.login(req.body)
            .then((token) => {
                res.cookie(COOKIE_NAME, token);
                res.redirect('/');
            })
            .catch(e => {
                res.render('login', { error: e.message, ...req.body });
                console.log(e);
            });
    },

    registerUser: (req, res) => {
        userService.register(req.body)
            .then(() => {
                res.redirect('/login');
            })
            .catch(e => {
                res.render('register', { error: e.message, ...req.body });
                console.log(e);
            });
    },

    logout: (req, res) => {
        res.clearCookie(COOKIE_NAME);
        res.redirect('/');
    }
};