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



sequelize.sync()
    .then(async () => {
        console.log('¡Tabla de productos construida con éxito!');
        
        await Producto.bulkCreate([
            {
                nombre: "HyperX Cloud 2",
                categoria: "Perifericos",
                precio: 120000,
                activo: true,
                descripcion: "Auriculares con sonido envolvente 7.1, ideales para una detección acústica precisa."
            },
            {
                nombre: "Router Telefónica Askey GPT-2741GNAC",
                categoria: "Hardware",
                precio: 45000,
                activo: true,
                descripcion: "Router dual band optimizado para abrir puertos y mejorar la conectividad."
            },
            {
                nombre: "Memoria RAM DDR5 32GB",
                categoria: "Hardware",
                precio: 180000,
                activo: false,
                descripcion: "Módulo de alta velocidad. (Sin stock temporalmente)."
            }
        ]);
        console.log('¡Artículos insertados correctamente en el depósito!');
    })
    .catch(error => console.log('Error al sincronizar:', error));

// ------------------------------------

app.listen(PORT, () => {
    console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});