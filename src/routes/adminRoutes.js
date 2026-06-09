const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get('/crear', adminController.crear);
router.post('/crear', upload.single('imagen'), adminController.guardar);

router.get('/editar/:id', adminController.editar);
router.post('/editar/:id', upload.single('imagen'), adminController.actualizar);
router.post('/eliminar/:id', adminController.eliminar);

module.exports = router;