const express = require('express');
const app = express();
// const path = require('path');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/detalle-producto/:id', productsController.renderProductsDetail);

router.get('/mis-compras', productsController.renderProductsCart);

router.get('/administrar-producto', productsController.renderAdminProduct);

// Creación de producto
router.get('/crear-producto', productsController.renderCreateProduct);
router.post('/guardar-producto', productsController.storeProduct);

// Edición de producto
router.get('/modificar-producto/:id', productsController.renderEditProduct);
router.put('/modificar-producto/:id', productsController.updateProduct);

// Eliminar producto
router.get('/eliminar-producto/:id', productsController.renderDeleteForm)
router.delete('/eliminar-producto/:id', productsController.deleteProduct);



module.exports = router;