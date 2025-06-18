const express = require('express');
const router = express.Router();
const {crearAbogado,mostrarAbogado,unAbogado} = require('../controllers/abogado.controller');

/**
 * @swagger
 * /api/abogado/crearAbogado:
 *   post:
 *     summary: Crear un nuevo abogado
 *     responses:
 *       200:
 *         description: Abogado creado exitosamente
 */
router.post('/crearAbogado', crearAbogado);
/**
 * @swagger
 * /api/abogados/:
 *   get:
 *     summary: mostrar Abogados
 *     responses:
 *       200:
 *         description: Lista de Abogados
 */
router.get('/', mostrarAbogado);
/**
 * @swagger
 * /api/abogados/:id:
 *   get:
 *     summary: mostrar Abogado
 *     responses:
 *       200:
 *         description: Abogado
 */
router.get('/:id', unAbogado);

module.exports = router;
