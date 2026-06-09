const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/crear', adminController.crear);

router.post('/crear', adminController.guardar);

router.get('/editar/:id', adminController.editar);

router.post('/editar/:id', adminController.actualizar);

router.post('/eliminar/:id', adminController.eliminar);

module.exports = router;