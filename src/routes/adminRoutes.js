const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.use(authMiddleware);

router.get("/dashboard", adminController.dashboard);
router.get("/ventas", adminController.ventas);

router.get("/crearProducto", adminController.crearProducto);
router.post("/crearProducto", upload.single("imagen"), adminController.guardar);

router.get("/editar/:id", adminController.editar);
router.post("/editar/:id", upload.single("imagen"), adminController.actualizar);

router.post("/eliminar/:id", adminController.eliminar);
router.post("/activar/:id", adminController.activar);
router.post("/desactivar/:id", adminController.desactivar);

module.exports = router;