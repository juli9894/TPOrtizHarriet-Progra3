const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const usuarioDecodificado = jwt.verify(token, process.env.PASSWORD);
        
        if (usuarioDecodificado.rol !== 'admin') {
            return res.redirect('/');
        }

        next();
    } catch (error) {
        return res.redirect('/login');
    }
}

module.exports = authMiddleware;