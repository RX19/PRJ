const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const controller = require('../controllers/usuarios-controller');

router.post('/', controller.postUsuario);
router.get('/', controller.getUsuarios);
router.put('/motoristas/:id', controller.putUsuarioMotorista);
router.get('/motoristas', controller.getUsuariosMotoristas);
router.put('/carrito/:id', controller.putCarritoUsuario);
router.get('/carrito/:id', controller.getCarritoUsuario);
// router.get('/:id', controller.getUsuario);
router.put('/usuario/:id', controller.putUsuario);
router.put('/password/:id', controller.putPassword);
router.delete('/:id', controller.deleteUsuario);

router.post('/login/A', controller.postUsuarioLoginA);
router.post('/login/B', controller.postUsuarioLoginB);
router.post('/login/C', controller.postUsuarioLoginC);

router.post('/registro/B', controller.postUsuarioRegistroB);
router.post('/registro/C', controller.postUsuarioRegistroC);

module.exports = router;