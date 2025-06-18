const express = require('express');
const router = express.Router();
const {enviarCodigo,verificarCodigo} = require('../controllers/login.controller');


router.post('/enviar-codigo', enviarCodigo);

router.post('/verificar-codigo',verificarCodigo);

module.exports = router;
