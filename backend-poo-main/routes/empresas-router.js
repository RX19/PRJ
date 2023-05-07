const express = require('express');
const router = express.Router();
const upload = require('../libs/storage');
const controller = require('../controllers/empresas-controller');


router.post('/', upload.fields([{name: 'logo'}, {name: 'banner'}]), controller.postEmpresa)
router.get('/', controller.getEmpresas);
router.get('/:id', controller.getEmpresa);
router.put('/:id', upload.fields([{name: 'logo'}, {name: 'banner'}]), controller.putEmpresa);
router.delete('/:id', controller.deleteEmpresa);

module.exports = router;