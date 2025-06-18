const express = require('express');
const router = express.Router();
const Tipo = require('../models/model.tipoContrato');


const  crearTipoContrato = async (req, res) => {
  try {
    const nuevoTipo = new Tipo(req.body);
    const TipoGuardado = await nuevoTipo.save();
    res.status(201).json(TipoGuardado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear proceso', error: err.message });
  }
};
module.exports = {
  crearTipoContrato
};