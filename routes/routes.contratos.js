const express = require('express');
const router = express.Router();
const {crearContrato,obtenerContratos} = require('../controllers/contratos.controller');

router.post('/crearContrato', crearContrato);
router.get('/contrato', obtenerContratos);

module.exports = router;
