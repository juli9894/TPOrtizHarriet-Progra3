const express = require('express');
const path = require('path'); 
const app = express();
const cookieParser = require('cookie-parser'); //npm install jsonwebtoken
const jwt = require('jsonwebtoken'); //npm install cookie-parser | sirve para acceder facilmente a información
require("dotenv").config(); //npm install dotenv

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

//jsonwebtoken
app.use((req, res, next) => {
    const token = req.cookies.token;
    res.locals.usuario = null;

    if(token){
        try{
            const usuario = jwt.verify(token, process.env.PASSWORD);
            res.locals.usuario = usuario;
        }catch(error){
            console.log("Token inválido");
        }
    }
    next();
});

const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

const sequelize = require('./database/connection');
const Producto = require('./database/models/Producto');
const Usuario = require('./database/models/Usuario');

sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(error => console.log('Error al sincronizar:', error));

// ------------------------------------

app.listen(PORT, () => {
    console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});