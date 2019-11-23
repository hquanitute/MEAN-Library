const jwt = require('jsonwebtoken');


module.exports = (role) => {
    return (req, res, next) => {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            }
            console.log(decoded);
            if (decoded.role) {
                let temp = 1;
                if (decoded.role == 'user') {
                    temp = 1;
                }
                if (decoded.role == 'admin') {
                    temp = 2;
                }
                if (temp >= role) {
                    req.body.userId = decoded.id;
                    next();
                } else{
                    res.json({ status: "Role not permit"});
                }
            }
        });
    }
}