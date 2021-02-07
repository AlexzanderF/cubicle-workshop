const jwt = require('jsonwebtoken');

module.exports = function () {
    return (req, res, next) => {
        if (req.cookies['USER_AUTH']) {
            try {
                const decodedToken = jwt.verify(req.cookies['USER_AUTH'], 'verySecretSecret');
                req.user = decodedToken;
                // need to set user in the res.locals object in order to be used by every view
                res.locals.user = decodedToken;
            } catch (error) {
                console.log(error);
                res.clearCookie('USER_AUTH');
            }
        }
        next();
    }
}