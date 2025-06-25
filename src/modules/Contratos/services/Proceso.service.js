const Proceso = require('../models/model.procesos');

const crearProcesoService = async (datosProceso) => {
  const nuevoProceso = new Proceso(datosProceso);
  return await nuevoProceso.save();
};

const obtenerProcesoService = async () => {
  return await Proceso.find();
};
const obtenerProcesoPorIdService = async (id) => {
  return await Proceso.findById(id);
};

module.exports = {
  crearProcesoService,
  obtenerProcesoService,
  obtenerProcesoPorIdService
};