
const express = require('express');
const router = express.Router();
const {nuevoProceso,mostrarProcesos,unProceso} = require('../controllers/procesos.controller');


/**
 * @swagger
 * /api/procesos/crearProceso:
 *   post:
 *     summary: Crear Proceso
 *     responses:
 *       201:
 *         description: crear nuevo proceso
 */
router.post('/crearProceso',nuevoProceso );

router.get('/', mostrarProcesos);

router.get('/:id', unProceso );

module.exports = router;