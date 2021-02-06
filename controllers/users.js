const userService = require('../services/userService');

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
                res.cookie('USER_AUTH', token);
                res.redirect('/');
            })
            .catch(e => { res.render('login', { error: e.message }); console.log(e); });
    },

    registerUser: (req, res) => {
        userService.register(req.body)
            .then(() => {
                res.redirect('/login');
            })
            .catch(e => { res.render('register', { error: e.message }); console.log(e); });
    }
};