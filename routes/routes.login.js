const express = require('express');
const router = express.Router();
const {enviarCodigo,verificarCodigo} = require('../controllers/login.controller');

/**
 * @swagger
 * /api/auth/enviar-codigo:
 *   post:
 *     summary: Ingresar y Enviar codigo Login
 *     responses:
 *       200:
 *         description: Codigo Login por correo
 */
router.post('/enviar-codigo', enviarCodigo);

/**
 * @swagger
 * /api/auth/verificar-codigo:
 *   post:
 *     summary: Verificar Codigo
 *     responses:
 *       200:
 *         description: Verificar login
 */
router.post('/verificar-codigo',verificarCodigo);

module.exports = router;
