const express = require('express');
const router = express.Router();
const { contratosLimpiosLim } = require('../controllers/excel.controller');
const { FiltrarConsecutivo } = require('../controllers/excel.controller');

router.get('/contratosLimpios', contratosLimpiosLim);

router.get('/filtroCon/:codigo',FiltrarConsecutivo)

module.exports = router;
