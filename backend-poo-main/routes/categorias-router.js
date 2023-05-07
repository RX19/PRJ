const express = require('express');
const router = express.Router();
const upload = require('../libs/storage');

const controller = require('../controllers/categorias-controller');

router.post('/', upload.single('imagen'), controller.postCategoria);
router.get('/', controller.getCategorias);
router.get('/:id', controller.getCategoria);
router.put('/:id', upload.single('imagen'), controller.putCategoria);
router.delete('/:id', controller.deleteCategoria);

module.exports = router;