const {crearContratoService, obtenerContratosService} = require('../services/contrato.service');


const crearContrato = async (req, res) => {
  try {
    const contratoGuardado = await crearContratoService(req.body);
    res.status(201).json(contratoGuardado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear contrato', error: err.message });
  }
};

const obtenerContratos = async (req, res) => {
  try {
    const contratos = await obtenerContratosService();
    res.json(contratos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener contratos', error: err.message });
  }
};

module.exports = {
  crearContrato,
  obtenerContratos
};
