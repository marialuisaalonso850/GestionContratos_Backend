const express = require('express');
const router = express.Router();
const { crearContrato, obtenerContratos,EliminarContratos,ActualizarContratos } = require('../controllers/contratos.controller');
const {verificarToken} = require('../middlewares/verificarToken.js');
const verificarRol = require('../middlewares/verificarRol.js');

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

/**
 * @swagger
 * /api/contratos/:id:
 *   delete:
 *     summary: Eliminar Abogado
 *     tags:
 *       - contratos
 *     responses:
 *       201:
 *         description: Eliminar Abogado
 */
router.delete('/:id',verificarToken,verificarRol(['admin']),EliminarContratos)

/**
 * @swagger
 * /api/contratos/:id:
 *   put:
 *     summary: Actualizar Contrato
 *     tags:
 *       - contratos
 *     responses:
 *       201:
 *         description: Actualizar contrato
 */
router.put("/:id",verificarToken,verificarRol(['admin']), ActualizarContratos );

module.exports = router;
