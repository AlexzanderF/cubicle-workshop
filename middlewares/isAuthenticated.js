// allows access to routes if the user is authenticated
module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    next();
}