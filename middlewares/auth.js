const jwt = require('jsonwebtoken');

module.exports = function () {
    return (req, res, next) => {
        if (req.cookies['USER_AUTH']) {
            try {
                const decodedToken = jwt.verify(req.cookies['USER_AUTH'], 'verySecretSecret');
                req.user = decodedToken;
            } catch (error) {
                console.log(error);
                res.clearCookie('USER_AUTH');
            }
        }

        next();
    }
}