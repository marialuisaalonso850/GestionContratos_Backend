
const express = require('express');
const router = express.Router();
const {nuevoProceso} = require('../controllers/procesos.controller');


/**
 * @swagger
 * /api/procesos/crearProceso:
 *   post:
 *     summary: Crear Proceso
 *     responses:
 *       200:
 *         description: crear nuevo proceso
 */
router.post('/crearProceso',nuevoProceso );

module.exports = router;