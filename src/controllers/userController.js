const bcrypt = require('bcryptjs');
const Usuario = require('../database/models/Usuario');
const jwt = require('jsonwebtoken');

const userController = {
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
    },

    login: (req, res) => {
        res.render('login');
    },

    iniciarSesion: async (req, res) => {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ 
                mensaje: "El email o la contraseña son obligatorios" })
        }

        try{
            const account = await Usuario.findOne({
                where: { 
                    email 
                }
            });
            
            //Verificar si existe la cuenta
            if(!account){
                return res.status(401).json({ mensaje: "Email o contraseña incorrectos" })
            }

            //Validar la contraseña
            const validacion = await bcrypt.compare(password, account.password)

            if(validacion){
                const token = jwt.sign({
                    id: account.id,
                    nombre: account.nombre,
                    email: account.email
                },
                process.env.PASSWORD, { expiresIn: "5m" }
            );

            res.cookie("token", token, {
                httpOnly: true
            });
            
            return res.redirect("/categorias");
            
            }else{
                res.status(401).json({ mensaje: "Email o contraseña incorrectos" })
            }
        } catch(error){
            console.log("Error al ingresar a la cuenta: ", error)
            res.status(500).json({ mensaje: "Ocurrió un error"});
        }  
    },

    logout: (req, res) => {
        res.clearCookie("token");
        res.redirect("/");
    }

};

module.exports = userController;