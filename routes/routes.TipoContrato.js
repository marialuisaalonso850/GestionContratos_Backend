const express = require('express');
const router = express.Router();
const {crearTipoContrato} = require('../controllers/TipoContrato.controller');


router.post('/CreartipoContrato',crearTipoContrato);
module.exports = router;