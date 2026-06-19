const PDFDocument = require("pdfkit");
const Producto = require("../database/models/Producto");

const mainController = {
    home: (req, res) => {
        res.render("index");
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
            return res.render("perifericos", { listaProductos: productosActivos });
        } catch (error) {
            console.error("Error al buscar en la base de datos:", error);
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
            return res.render("componentes", { listaProductos: productosActivos });
        } catch (error) {
            console.error("Error al buscar en la base de datos:", error);
            return res.send("Ocurrió un error al cargar el catálogo.");
        }
    },

    detalle: async (req, res) => {
        try {
            const idProducto = req.params.id;
            
            const productoEncontrado = await Producto.findByPk(idProducto);

            if (productoEncontrado) {
                return res.render("detalle", { producto: productoEncontrado });
            } else {
                return res.send("Producto no encontrado.");
            }
        } catch (error) {
            console.error("Error al buscar el detalle del producto:", error);
            return res.send("Ocurrió un error al cargar el producto.");
        }
    },

    carrito: (req, res) => {
        res.render("carrito");
    },

    generarTicket: (req, res) => {
        const { carrito, total, cliente } = req.body;

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=Ticket_HardZone.pdf");

        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(res); 

        doc.fontSize(20).text("HardZone Autoservicio", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text("Comprobante de Compra", { align: "center" });
        
        doc.fontSize(12).text(`Cliente: ${cliente}`, { align: 'center' });
        doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: "center" });
        doc.moveDown(2);

        let currentY = doc.y;
        doc.fontSize(12);
        doc.text("Producto", 50, currentY);
        doc.text("Cant.", 320, currentY);
        doc.text("Subtotal", 420, currentY);
        
        currentY += 15;
        doc.moveTo(50, currentY).lineTo(500, currentY).stroke(); 
        currentY += 15;

        if (carrito && carrito.length > 0) {
            carrito.forEach(prod => {
                const subtotal = prod.precio * prod.cantidad;
                
                doc.text(prod.nombre, 50, currentY, { width: 250 }); 
                doc.text(prod.cantidad.toString(), 320, currentY);
                doc.text(`$${subtotal}`, 420, currentY);
                
                currentY = Math.max(doc.y, currentY + 20); 
            });
        }

        currentY += 10;
        doc.moveTo(50, currentY).lineTo(500, currentY).stroke();
        currentY += 20;
        
        doc.fontSize(16).text(`TOTAL: $${total}`, 50, currentY, { align: "right", width: 450 });
        
        currentY += 40;
        doc.fontSize(12).text("¡Gracias por tu compra!", 50, currentY, { align: "center", width: 450 });

        doc.end();
    }
};

module.exports = mainController;