const jwt = require('jsonwebtoken');
const { SECRET, COOKIE_NAME } = require('../config/config');

module.exports = function () {
    return (req, res, next) => {
        if (req.cookies[COOKIE_NAME]) {
            try {
                const decodedToken = jwt.verify(req.cookies[COOKIE_NAME], SECRET);
                req.user = decodedToken;
                // need to set user in the res.locals object in order to be used by every view !!!
                res.locals.user = decodedToken;
            } catch (error) {
                console.log(error);
                res.clearCookie(COOKIE_NAME);
            }
        }
        next();
    }
}