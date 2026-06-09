const Producto = require('../database/models/Producto');

const adminController = {

    crear: (req, res) => {
        res.render('crearProducto'); 
    },
    
    guardar: async (req, res) => {
        try {
            await Producto.create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                categoria: "General" 
            });

            res.redirect('/productos');

        } catch (error) {
            console.error(error);
            res.send('Error al guardar.');
        }
    },

    eliminar: async (req, res) => {
        try {
            const idABorrar = req.params.id;
            
            await Producto.destroy({
                where: {
                    id: idABorrar
                }
            });

            res.redirect('/productos');

        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.send('Ocurrió un error al intentar eliminar el producto.');
        }
    },

    editar: async (req, res) => {
        try {
            const idProducto = req.params.id;
            
            const productoEncontrado = await Producto.findByPk(idProducto);

            if (productoEncontrado) {
                res.render('editarProducto', { producto: productoEncontrado });
            } else {
                res.send('No se encontró el producto en la base de datos.');
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            res.send('Error al cargar la vista de edición.');
        }
    },

    actualizar: async (req, res) => {
        try {
            const idProducto = req.params.id;

            await Producto.update(
                {
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    descripcion: req.body.descripcion
                },
                {
                    where: { id: idProducto } 
                }
            );

            res.redirect('/productos');
        } catch (error) {
            console.error('Error al actualizar:', error);
            res.send('Ocurrió un error al guardar los cambios.');
        }
    }
};

module.exports = adminController;