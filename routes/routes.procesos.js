
const express = require('express');
const router = express.Router();
const {nuevoProceso} = require('../controllers/procesos.controller');


router.post('/crearProceso',nuevoProceso );

module.exports = router;