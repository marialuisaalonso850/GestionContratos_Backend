const express = require('express');
const router = express.Router();
const {enviarCodigo,verificarCodigo} = require('../controllers/login.controller');
const {verificarToken} = require('../middlewares/verificarToken.js');
const verificarRol = require('../middlewares/verificarRol.js')

/**
 * @swagger
 * /api/auth/enviar-codigo:
 *   post:
 *     summary: Ingresar y Enviar codigo Login
 *     responses:
 *       201:
 *         description: Codigo Login por correo
 */
router.post('/enviar-codigo', enviarCodigo);


/**
 * @swagger
 * /api/auth/verificar-codigo:
 *   post:
 *     summary: Verificar Codigo
 *     responses:
 *       201:
 *         description: Verificar login
 */
router.post('/verificar-codigo',verificarToken,verificarRol(['admin']), verificarCodigo);

module.exports = router;
