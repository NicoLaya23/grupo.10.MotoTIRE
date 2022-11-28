const express = require('express');
const app = express();
// const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/registrarse', authController.renderRegister);

router.get('/ingresar', authController.renderLogin);

module.exports = router;