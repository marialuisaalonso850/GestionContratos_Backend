
const express = require('express');
const router = express.Router();
const {nuevoProceso,mostrarProcesos,unProceso} = require('../controllers/procesos.controller');


/**
 * @swagger
 * /api/procesos/crearProceso:
 *   post:
 *     summary: Crear Proceso
 *     tags:
 *       - Procesos
 *     responses:
 *       201:
 *         description: crear nuevo proceso
 */
router.post('/crearProceso',nuevoProceso );

/**
 * @swagger
 * /api/procesos/:
 *   get:
 *     summary: Lista Procesos
 *     tags:
 *       - Procesos
 *     responses:
 *       201:
 *         description: Lista proceso
 */
router.get('/', mostrarProcesos);

/**
 * @swagger
 * /api/procesos/:id:
 *   get:
 *     summary: mostrar Proceso
 *     tags:
 *       - Procesos
 *     responses:
 *       201:
 *         description: mostrar  proceso
 */
router.get('/:id', unProceso );

module.exports = router;