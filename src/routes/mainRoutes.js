const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const userController = require("../controllers/userController");

router.get("/", mainController.home);
router.get("/categorias", mainController.categorias);
router.get("/componentes", mainController.componentes);
router.get("/perifericos", mainController.perifericos);
router.get("/carrito", mainController.carrito);
router.get('/producto/:id', mainController.detalle);

router.get("/registro", userController.registro);
router.post("/registro", userController.procesarRegistro);

router.get("/login", userController.login);
router.post("/login", userController.iniciarSesion);

router.get("/logout", userController.logout);

router.post('/procesar-compra', mainController.procesarCompra);
router.get('/comprobante/:id', mainController.verComprobante);
router.get('/comprobante/pdf/:id', mainController.descargarTicketPdf);

module.exports = router;