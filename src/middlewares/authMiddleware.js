const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        jwt.verify(token, process.env.PASSWORD);
        
        next();
    } catch (error) {
        return res.redirect('/login');
    }
}

module.exports = authMiddleware;