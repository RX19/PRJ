const express = require('express');
const router = express.Router();
const orden = require('../models/orden');
const mongoose = require('mongoose');

const controller = require('../controllers/ordenes-controller');

router.post('/', controller.postOrden);
router.get('/', controller.getOrdenes);
router.get('/disponibles', controller.getOrdenesDisponibles);
router.get('/sinEntregar/:id', controller.getOrdenesSinEntregar);
router.get('/entregadas/:id', controller.getOrdenesEntregadas);
router.get('/:id', controller.getOrden);
router.put('/:id', controller.putOrden);
router.put('/tomada/:id', controller.putOrdenTomada);
router.delete('/:id', controller.deleteOrden);
router.get('/pendientes/:id', controller.getOrdenesPendientes)

module.exports = router;