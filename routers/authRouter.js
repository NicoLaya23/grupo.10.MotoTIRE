const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve('public/img'))
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});
const upload = multer({ storage:storage });
const cpUpload = upload.fields([{ name: 'user_logo', maxCount: 1 }]);

////////////////////////////////////////


// Login de usuario
router.get('/ingresar', authController.renderLogin);
router.post('/login', authController.login);

// Creación de usuario
router.get('/registrarse', authController.renderRegister);
router.post('/crear-usuario',
cpUpload,
authController.createUser);

module.exports = router;

