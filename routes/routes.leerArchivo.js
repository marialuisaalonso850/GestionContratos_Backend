const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { exportarAExcel, exportarAPDF } = require('../controllers/excel.controller');
const contratos = require('../dtcontratos.json');

router.get('/excel', (req, res) => {
  
   exportarAExcel(contratos, 'contratos.xlsx');
  
});

router.get('/pdf', (req, res) => {
 
    exportarAPDF(contratos, 'contratos.pdf');
    
  
});

module.exports = router;
