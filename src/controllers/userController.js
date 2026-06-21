const bcrypt = require("bcryptjs");
const Usuario = require("../database/models/Usuario");
const jwt = require("jsonwebtoken");

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
                password: contraseñaEncriptada}
            );
            return res.redirect("/login");
        } catch (error) {
            console.error(error);
            return res.render("registro", {mensaje: "La cuenta ya existe."});
        }
    },

    login: (req, res) => {
        res.render("login", {
            mensaje: ""
        });
    },

    iniciarSesion: async (req, res) => {
        const { email, password } = req.body;
        
        try{
            const account = await Usuario.findOne({where: {email}});
            if (!account) {
                return res.render("login", {mensaje: "La cuenta no existe."});
            }

            const validacion = await bcrypt.compare(password, account.password)
            if(validacion){
                const token = jwt.sign(
                    {
                        id: account.id,
                        nombre: account.nombre,
                        email: account.email
                    },
                    process.env.PASSWORD, {expiresIn: "15m"}
                )
                    
                res.cookie("token", token, {httpOnly: true});
                return res.redirect("/admin/dashboard");
            }else{
                return res.render("login", { mensaje: "Email o contraseña incorrectos."});
            }
        }catch(error){
            console.error(error);
            return res.render("login", {mensaje: "Ocurrió un error al iniciar sesión."});
        }  
    },

    logout: (req, res) => {
        res.clearCookie("token");
        res.redirect("/");
    }
};

module.exports = userController;