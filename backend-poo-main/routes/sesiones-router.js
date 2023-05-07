const express = require('express');
const router = express.Router();

const controller = require('../controllers/sesiones-controller');

router.get('/:id', controller.getSession);
router.get('/cerrar/:id', controller.getCerrarSession);

module.exports = router;