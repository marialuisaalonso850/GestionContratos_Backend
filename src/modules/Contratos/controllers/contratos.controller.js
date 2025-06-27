const {crearContratoService, obtenerContratosService,eliminarContratosService,updateContratoService} = require('../services/contrato.service');


const crearContrato = async (req, res) => {
  try {
    const contratoGuardado = await crearContratoService(req.body, req.usuario?.nombre || 'Desarrollo Tic');
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

const EliminarContratos = async (req, res) => {
  try {
    const contrato = await eliminarContratosService(req.params.id);
    res.json(contrato);
  } catch (err) {
    const mensaje =
      err.message === 'Contrato no encontrado'
        ? 'Contrato no encontrado'
        : 'Error al obtener contratos';
    res.status(500).json({ mensaje, error: err.message });
  }
};
 
const ActualizarContratos = async (req, res) => {
  const { id } = req.params;
  const nuevosDatos = req.body;
  const usuario = req.usuario?.nombre || 'Sistema';

  try {
    const resultado = await updateContratoService(id, nuevosDatos, usuario);
    res.json(resultado);
  } catch (error) {
    if (error.message === 'Contrato no encontrado') {
      res.status(404).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: 'Error en la actualización', error: error.message });
    }
  }
};

const ejecutarVerificacionAlertas = async (req, res) => {
  try {
    const alertas = await verificarContratosVencimiento();
    res.status(200).json({
      mensaje: 'Verificación completada',
      alertasEnviadas: alertas
    });
  } catch (error) {
    console.error('Error en verificación de contratos:', error);
    res.status(500).json({ error: 'Error al verificar alertas de contratos' });
  }
};


module.exports = {
  crearContrato,
  obtenerContratos,
  EliminarContratos,
  ActualizarContratos,
  ejecutarVerificacionAlertas
};
