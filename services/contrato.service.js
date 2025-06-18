const Contrato = require('../models/model.contratos');

const crearContratoService = async (datosContrato) => {
  const nuevoContrato = new Contrato(datosContrato);
  return await nuevoContrato.save();
};


const obtenerContratosService = async () => {
  return await Contrato.find();
};
const obtenerContratoPorIdService = async (id) => {
  return await Contrato.findById(id);
};


module.exports = {
  crearContratoService,
  obtenerContratosService,
  obtenerContratoPorIdService
};
