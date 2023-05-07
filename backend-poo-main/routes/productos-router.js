const express = require('express');
const router = express.Router();
const upload = require('../libs/storage')

const controller = require('../controllers/productos-controller');

router.post('/', upload.single('imagen'), controller.postProducto);
router.get('/', controller.getProductos);
router.get('/:id', controller.getProducto);
router.put('/cantidad/:id', controller.putCantidad);
router.put('/:id', upload.single('imagen'), controller.putProducto);
router.delete('/:id', controller.deleteProducto);

module.exports = router;