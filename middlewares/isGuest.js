// allows access to routes if the user is a guest
module.exports = (req, res, next) => {
    if (req.user) {
        res.redirect('/');
        return;
    }
    next();
}