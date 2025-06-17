const express = require('express');
const router = express.Router();
const Abogado = require('../models/model.abogado');


router.post('/crearAbogado', async (req, res) => {
  try {
    const nuevoAbogado = new Abogado(req.body);
    const abogadoGuardado = await nuevoAbogado.save();
    res.status(201).json(abogadoGuardado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear abogado', error: err.message });
  }
});

router.get('/abogado', async (req, res) => {
  try {
    const abogados = await Abogado.find();
    res.json(abogados);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener abogados', error: err.message });
  }
});

// Obtener abogado por ID
router.get('/:id', async (req, res) => {
  try {
    const abogado = await Abogado.findById(req.params.id);
    if (!abogado) return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    res.json(abogado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar abogado', error: err.message });
  }
});


module.exports = router;
