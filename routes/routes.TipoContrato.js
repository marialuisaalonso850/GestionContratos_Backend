const express = require('express');
const router = express.Router();
const {crearTipoContrato} = require('../controllers/TipoContrato.controller');


/**
 * @swagger
 * /api/tipoContrato/CreartipoContrato:
 *   post:
 *     summary: Crear Tipo Contato
 *     tags:
 *       - Contratos
 *     responses:
 *       201:
 *         description: crear nuevo tipoContrato
 */
router.post('/CreartipoContrato',crearTipoContrato);
module.exports = router;