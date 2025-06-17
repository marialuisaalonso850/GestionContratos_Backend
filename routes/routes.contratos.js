const express = require('express');
const router = express.Router();
const Contrato = require('../models/model.contratos');

router.post('/crearContrato', async (req, res) => {
  try {
    const nuevoContrato = new Contrato(req.body);
    const contratoGuardado = await nuevoContrato.save();
    res.status(201).json(contratoGuardado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear contrato', error: err.message });
  }
});

router.get('/contrato', async (req, res) => {
  try {
    const Contratos  = await Contrato.find();
    res.json(Contratos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener contratos', error: err.message });
  }
});

module.exports = router;
