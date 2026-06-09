const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');

router.get('/', mainController.home);
router.get('/productos', mainController.productos);
router.get('/carrito', mainController.carrito);

router.get('/login', userController.login);
router.get('/registro', userController.registro);
router.post('/registro', userController.procesarRegistro);

module.exports = router;