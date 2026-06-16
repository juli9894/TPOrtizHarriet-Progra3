const Producto = require('../database/models/Producto');

const mainController = {
    home: (req, res) => {
        res.render('index');
    },
    categorias: (req, res)=>{
        res.render("categorias");
    },

    // Recordatorio: Actualizar componentes y perifericos con la logica de productos. 

    componentes: (req, res)=>{
        res.render("componentes");
    },
    perifericos: (req, res)=>{
        res.render("perifericos");
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