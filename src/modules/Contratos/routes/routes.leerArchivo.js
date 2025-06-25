const express = require('express');
const router = express.Router();
const { contratosLimpios } = require('../controllers/excel.controller');

router.get('/contratosLimpios', contratosLimpios);

module.exports = router;
