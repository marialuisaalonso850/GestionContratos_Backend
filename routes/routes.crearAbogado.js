const express = require('express');
const router = express.Router();
const {crearAbogado,mostrarAbogado,unAbogado} = require('../controllers/abogado.controller');

router.post('/crearAbogado', crearAbogado);
router.get('/abogado', mostrarAbogado);
router.get('/:id', unAbogado);

module.exports = router;
