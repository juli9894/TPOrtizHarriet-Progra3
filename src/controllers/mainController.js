const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const mainController = {

    home: (req, res) => {
        res.render('index');
    },

    productos: (req, res) => {
        const productosActivos = productos.filter(producto => producto.activo === true);

        res.render('productos', { listaProductos: productosActivos });
    },

    carrito: (req, res) => {
        res.render('carrito');
    }
};

module.exports = mainController;