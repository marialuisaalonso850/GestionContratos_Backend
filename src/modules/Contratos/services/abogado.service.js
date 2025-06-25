const Abogado = require('../models/model.abogado');


const crearAbogadoService = async (datosAbogado) => {
  const nuevoAbogado = new Abogado(datosAbogado);
  return await nuevoAbogado.save();
};

const obtenerAbogadosService = async () => {
  return await Abogado.find();
};

const obtenerAbogadoPorIdService = async (id) => {
  return await Abogado.findById(id);
};

module.exports = {
  crearAbogadoService,
  obtenerAbogadosService,
  obtenerAbogadoPorIdService
};
