const express = require('express');
const router = express.Router();
const { crearContrato, obtenerContratos } = require('../controllers/contratos.controller');

/**
 * @swagger
 * /api/contrato/crearContrato:
 *   post:
 *     summary: Crear un nuevo contrato
 *     responses:
 *       200:
 *         description: Contrato creado exitosamente
 */
router.post('/crearContrato', crearContrato);

/**
 * @swagger
 * /api/contrato/:
 *   get:  
 *     summary: Obtener todos los contratos
 *     responses:
 *       200:
 *         description: Lista de contratos obtenida correctamente
 */
router.get('/', obtenerContratos);

module.exports = router;
