const express = require('express');
const path = require('path'); 
const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

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