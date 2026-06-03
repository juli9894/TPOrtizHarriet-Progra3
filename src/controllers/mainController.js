const mainController = {

    home: (req, res) => {
        res.render('index');
    },

    productos: (req, res) => {
        res.render('productos');
    },

    carrito: (req, res) => {
        res.render('carrito');
    }
};

module.exports = mainController;