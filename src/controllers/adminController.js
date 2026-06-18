const Producto = require("../database/models/Producto");

const adminController = {

    crearProducto: (req, res) => {
        res.render("crearProducto"); 
    },
    dashboard: async (req, res) => {
        try {
            const productosActivos = await Producto.findAll();
            return res.render("dashboard", { listaProductos: productosActivos });
        } catch (error) {
            console.error("Error al buscar en la base de datos:", error);
            return res.send("Ocurrió un error al cargar el catálogo.");
        }
    },
    
    guardar: async (req, res) => {
        try {
            await Producto.create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                categoria: req.body.categoria,
                imagen: req.file ? req.file.filename : "default.png"
            });
            return res.redirect("/categorias");
        } catch (error) {
            console.error(error);
            return res.send("Error al guardar.");
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
            return res.redirect("/categorias");

        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            return res.send("Ocurrió un error al intentar eliminar el producto.");
        }
    },

    editar: async (req, res) => {
        try {
            const idProducto = req.params.id;
            
            const productoEncontrado = await Producto.findByPk(idProducto);

            if (productoEncontrado) {
                return res.render("editarProducto", { producto: productoEncontrado });
            } else {
                return res.send("No se encontró el producto en la base de datos.");
            }
        } catch (error) {
            console.error("Error al buscar el producto:", error);
            return res.send("Error al cargar la vista de edición.");
        }
    },

    actualizar: async (req, res) => {
        try {
            const idProducto = req.params.id;

            const datosActualizados = {
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion
            };

            if (req.file) {
                datosActualizados.imagen = req.file.filename;
            }

            await Producto.update(datosActualizados, {
                where: { id: idProducto }
            });
            return res.redirect("/categorias");
        } catch (error) {
            console.error("Error al actualizar:", error);
            return res.send("Ocurrio un error al guardar los cambios.");
        }
    },

    desactivar: async (req, res) => {
        try {
            const idProducto = req.params.id;

            const datosActualizados = {
                activo: false
            };

            await Producto.update(datosActualizados, {
                where: { id: idProducto }
            });            
            return res.redirect("/admin/dashboard");
        } catch (error) {
            console.error("Error al actualizar:", error);
            return res.send("Ocurrio un error al guardar los cambios.");
        }
    },

    activar: async (req, res) => {
        try {
            const idProducto = req.params.id;

            const datosActualizados = {
                activo: true
            };

            await Producto.update(datosActualizados, {
                where: { id: idProducto }
            });            
            return res.redirect("/admin/dashboard");
        } catch (error) {
            console.error("Error al actualizar:", error);
            return res.send("Ocurrio un error al guardar los cambios.");
        }
    }
};

module.exports = adminController;