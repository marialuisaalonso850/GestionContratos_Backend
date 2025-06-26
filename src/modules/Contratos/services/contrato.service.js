const Contrato = require('../models/model.contratos');
const {ContratoCreado} = require('./email.service')


const validarCorreo = (correo) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
};

const noNumeros = (texto) => {
  const regex = /^[^\d]+$/;
  return regex.test(texto);
};

const crearContratoService = async (datosContrato) => {
  const { CorreoDependencia, NombreContratista } = datosContrato;

 
  if (!CorreoDependencia || !validarCorreo(CorreoDependencia)) {
    throw new Error('Correo electrónico inválido o faltante');
  }


  if (!noNumeros(NombreContratista)) {
    throw new Error('El nombre del contratista no puede contener números');
  }

  const nuevoContrato = new Contrato(datosContrato);
  await nuevoContrato.save();

  const contratoGuardado = await Contrato.findById(nuevoContrato._id)
    .populate('proceso', 'nombreProceso')
    .populate('tipoContrato', 'tipoContrato')
    .populate('AbogadoAsignado', 'nombreAbogado');

  await ContratoCreado(
    contratoGuardado.CorreoDependencia,
    contratoGuardado.proceso?.nombreProceso,
    contratoGuardado.CorreoDependencia,
    contratoGuardado.consecutivo,
    contratoGuardado.tipoContrato?.tipoContrato,
    contratoGuardado.NombreContratista
  );

  return contratoGuardado;
};


const obtenerContratosService = async () => {
  return await Contrato.find();
};
const obtenerContratoPorIdService = async (id) => {
  return await Contrato.findById(id);
};

const eliminarContratosService = async (id) => {
  try {
    const contrato = await Contrato.findByIdAndDelete(id);
    if (!contrato) {
      throw new Error('Contrato no encontrado');
    }
    return contrato;
  } catch (error) {
    throw new Error('Error interno al eliminar contratos');
  }
};


const updateContratoService = async (id, nuevosDatos, usuario = 'Sistema') => {
  try {
    const contrato = await Contrato.findById(id);
    if (!contrato) throw new Error('Contrato no encontrado');

    const historialNuevasEntradas = [];

    for (let campo in nuevosDatos) {
      if (
        contrato[campo] !== undefined &&
        contrato[campo] !== nuevosDatos[campo]
      ) {
        historialNuevasEntradas.push({
          campo,
          anterior: contrato[campo],
          nuevo: nuevosDatos[campo],
          usuario,
          fecha: new Date()
        });

        contrato[campo] = nuevosDatos[campo];
      }
    }

    if (historialNuevasEntradas.length > 0) {
      if (!Array.isArray(contrato.historial)) {
        contrato.historial = [];
      }
      contrato.historial.push(...historialNuevasEntradas);
      await contrato.save();
      return {
        mensaje: 'Contrato actualizado con historial guardado',
        contrato
      };
    } else {
      return {
        mensaje: 'No hubo cambios en los campos',
        contrato
      };
    }
  } catch (error) {
    throw error;
  }
};


module.exports = {
  crearContratoService,
  obtenerContratosService,
  obtenerContratoPorIdService,
  eliminarContratosService,
  updateContratoService

};
