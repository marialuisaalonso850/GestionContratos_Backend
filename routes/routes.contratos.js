const express = require('express');
const router = express.Router();
const { crearContrato, obtenerContratos } = require('../controllers/contratos.controller');

/**
 * @swagger
 * /api/contrato/crearContrato:
 *   post:
 *     summary: Crear un nuevo contrato
 *     tags:
 *       - Contratos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proceso
 *               - tipoContrato
 *               - objeto
 *               - NombreContratista
 *               - AbogadoAsignado
 *               - FechaInicio
 *               - FechaFinalización
 *               - TeléfonoContratista
 *               - EstadoContrato
 *             properties:
 *               proceso:
 *                 type: string
 *                 example: 6655c2f0bdb8b7c79fa8dffe
 *               tipoContrato:
 *                 type: string
 *                 example: 6655c2f0bdb8b7c79fa8d111
 *               objeto:
 *                 type: string
 *                 example: Contratar servicios de soporte técnico
 *               NombreContratista:
 *                 type: string
 *                 example: Ana Torres
 *               AbogadoAsignado:
 *                 type: string
 *                 example: 6655c2f0bdb8b7c79fa8aaaa
 *               FechaInicio:
 *                 type: string
 *                 format: date
 *                 example: 2024-07-01
 *               FechaFinalización:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-31
 *               TeléfonoContratista:
 *                 type: string
 *                 example: 3101234567
 *               EstadoContrato:
 *                 type: string
 *                 example: Vigente
 *     responses:
 *       201:
 *         description: Contrato creado exitosamente
 */

router.post('/crearContrato', crearContrato);

/**
 * @swagger
 * /api/contrato:
 *   get:
 *     summary: Obtener todos los contratos (con filtros opcionales)
 *     tags:
 *       - Contratos
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [Vigente, Vencido, ProximoVencer]
 *         description: Estado del contrato a filtrar
 *       - in: query
 *         name: tipoContrato
 *         schema:
 *           type: string
 *         description: ID del tipo de contrato
 *       - in: query
 *         name: NombreContratista
 *         schema:
 *           type: string
 *         description: Nombre del contratista
 *     responses:
 *       200:
 *         description: Lista de contratos obtenida correctamente
 */
router.get('/', obtenerContratos);


module.exports = router;
