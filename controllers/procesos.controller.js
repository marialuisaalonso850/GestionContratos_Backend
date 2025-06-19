const Proceso = require('../models/model.procesos');
const {crearProcesoService,obtenerProcesoService,obtenerProcesoPorIdService} = require('../services/Proceso.service');


const  nuevoProceso = async (req, res) => {
  try {
    const nuevoProcesoo = await crearProcesoService(req.body);
    res.status(201).json(nuevoProcesoo);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear proceso', error: err.message });
  }
};

const mostrarProcesos = async (req, res) => {
  try {
    const procesos = await obtenerProcesoPorIdService();
    res.json(procesos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener procesos', error: err.message });
  }
};

const unProceso = async (req, res) => {
  try {
    const proceso = await obtenerProcesoPorIdService(req.params.id);
    if (!proceso ) return res.status(404).json({ mensaje: 'Proceso no encontrado' });
    res.json(proceso);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar proceso ', error: err.message });
  }
};

module.exports = {
  nuevoProceso,
  mostrarProcesos,
  unProceso
};