const {crearAbogadoService,obtenerAbogadosService,obtenerAbogadoPorIdService} = require('../services/abogado.service');

const crearAbogado = async (req, res) => {
  try {
    const abogadoGuardado = await crearAbogadoService(req.body);
    res.status(201).json(abogadoGuardado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear abogado', error: err.message });
  }
};

const mostrarAbogado = async (req, res) => {
  try {
    const abogados = await obtenerAbogadosService();
    res.json(abogados);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener abogados', error: err.message });
  }
};

const unAbogado = async (req, res) => {
  try {
    const abogado = await obtenerAbogadoPorIdService(req.params.id);
    if (!abogado) return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    res.json(abogado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar abogado', error: err.message });
  }
};

module.exports = {
  crearAbogado,
  mostrarAbogado,
  unAbogado
};
