const bcrypt = require('bcryptjs');
const Usuario = require('../database/models/Usuario');

const userController = {
    login: (req, res) => {
        res.render('login');
    },

    registro: (req, res) => {
        res.render("registro", {
            mensaje: ""
        });
    },

    procesarRegistro: async (req, res) => {
        try {
            const contraseñaEncriptada = bcrypt.hashSync(req.body.password, 10);

            await Usuario.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: contraseñaEncriptada
            });

            res.redirect('/login');

        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.render("registro", {
                mensaje: "La cuenta ya existe."
            });
        }
    }
};

module.exports = userController;