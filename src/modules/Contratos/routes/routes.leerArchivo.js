const express = require('express');
const router = express.Router();
const { contratosLimpiosLim } = require('../controllers/excel.controller');
const { FiltrarConsecutivo } = require('../controllers/excel.controller');

/**
 * @swagger
 * /api/datos/contratosLimpios:
 *   get:
 *     summary: Historial Contratos
 *     tags:
 *       - Historial Contratos 2016 -2025
 *     responses:
 *       201:
 *         description: Historial Contratos
 */
router.get('/contratosLimpios', contratosLimpiosLim);

/**
 * @swagger
 * /api/filtroCon/:codigo:
 *   get:
 *     summary: Filtrar Contratos por consecutivo
 *     tags:
 *       - Historial Contratos 2016 -2025
 *     responses:
 *       201:
 *         description: Historial Contratos por codigo de consecutivo
 */
router.get('/filtroCon/:codigo',FiltrarConsecutivo)

module.exports = router;
