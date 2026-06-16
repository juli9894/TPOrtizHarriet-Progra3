const Producto = require('../database/models/Producto');

const mainController = {
    home: (req, res) => {
        res.render('index');
    },
    categorias: (req, res)=>{
        res.render("categorias");
    },

    perifericos: async (req, res) => {
        try {
            const productosActivos = await Producto.findAll({
                where: {
                    categoria: "Periferico",
                    activo: true
                }
            });
            res.render('perifericos', { listaProductos: productosActivos });
        } catch (error) {
            console.error('Error al buscar en la base de datos:', error);
        }
    },

    componentes: async (req, res) => {
        try {
            const productosActivos = await Producto.findAll({
                where: {
                    categoria: "Componente",
                    activo: true
                }
            });
            res.render('componentes', { listaProductos: productosActivos });
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