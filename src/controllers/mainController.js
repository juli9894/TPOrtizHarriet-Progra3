const Producto = require('../database/models/Producto');

const mainController = {
    home: (req, res) => {
        res.render('index');
    },
    
    productos: async (req, res) => {
        try {
            const productosActivos = await Producto.findAll({
                where: {
                    activo: true
                }
            });
            
            res.render('productos', { listaProductos: productosActivos });
        } catch (error) {
            console.error('Error al buscar en la base de datos:', error);
            res.send('Ocurrió un error al cargar el catálogo.');
        }
    },

    carrito: (req, res) => {
        res.render('carrito');
    }
};

module.exports = mainController;