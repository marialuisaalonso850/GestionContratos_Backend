
const express = require('express');
const router = express.Router();
const Proceso = require('../models/model.procesos');


router.post('/crearProceso', async (req, res) => {
  try {
    const nuevoProceso = new Proceso(req.body);
    const ProcesoGuardado = await nuevoProceso.save();
    res.status(201).json(ProcesoGuardado );
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear proceso', error: err.message });
  }
});
module.exports = router;