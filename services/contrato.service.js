const Contrato = require('../models/model.contratos');

const crearContratoService = async (datosContrato) => {
  const nuevoContrato = new Contrato(datosContrato);
  return await nuevoContrato.save();
};


const obtenerContratosService = async () => {
  return await Contrato.find();
};

module.exports = {
  crearContratoService,
  obtenerContratosService
};
