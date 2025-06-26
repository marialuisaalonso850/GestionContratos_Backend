const express = require('express');
const router = express.Router();
const {enviarCodigo,verificarCodigo} = require('../controllers/login.controller');
const {verificarToken} = require('../middlewares/verificarToken.js');
const verificarRol = require('../middlewares/verificarRol.js')

/**
 * @swagger
 * /api/auth/enviar-codigo:
 *   post:
 *     summary: Solicita un código de verificación por correo para iniciar sesión
 *     tags:
 *       - Login o Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: usuario@ejemplo.com
 *                 description: Correo electrónico del usuario que solicita el código
 *     responses:
 *       201:
 *         description: Código enviado correctamente al correo del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Código enviado exitosamente
 *                 codigoIngresar:
 *                   type: string
 *                   example: "927315"
 *                   description: Código temporal enviado al correo
 *       400:
 *         description: Solicitud inválida (correo faltante o mal formado)
 *       500:
 *         description: Error interno al enviar el código
 */

router.post('/enviar-codigo', enviarCodigo);


/**
 * @swagger
 * /api/auth/verificar-codigo:
 *   post:
 *     summary: Verificar Codigo
 *     tags:
 *       - Login o Usuario
 *     responses:
 *       201:
 *         description: Verificar login
 */
router.post('/verificar-codigo',verificarToken,verificarRol(['admin']), verificarCodigo);

module.exports = router;
