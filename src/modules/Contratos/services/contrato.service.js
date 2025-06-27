const Contrato = require('../models/model.contratos');
const {ContratoCreado,enviarCorreo} = require('./email.service')
const dayjs = require('dayjs');

const obtenerDiasDeAlerta = () => [30, 15, 10];

const validarCorreo = (correo) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
};

const noNumeros = (texto) => {
  const regex = /^[^\d]+$/;
  return regex.test(texto);
};


const crearContratoService = async (datosContrato, usuario) => {
  const { CorreoDependencia, NombreContratista, FechaFinalización } = datosContrato;

  if (!CorreoDependencia || !validarCorreo(CorreoDependencia)) {
    throw new Error('Correo electrónico inválido o faltante');
  }

  if (!noNumeros(NombreContratista)) {
    throw new Error('El nombre del contratista no puede contener números');
  }

  const nuevoContrato = new Contrato({
    ...datosContrato,
    usuarioModifico: usuario,
    alertasEnviadas: []
  });

  await nuevoContrato.save();

  // Obtener contrato completo con populate
  const contratoGuardado = await Contrato.findById(nuevoContrato._id)
    .populate('proceso', 'nombreProceso')
    .populate('tipoContrato', 'tipoContrato')
    .populate('AbogadoAsignado', 'nombreAbogado');

  const hoy = dayjs();
  const fechaFin = dayjs(FechaFinalización);
  const diasRestantes = fechaFin.diff(hoy, 'day');
  const diasDeAlerta = obtenerDiasDeAlerta();

  console.log('🗓 FechaFinalización:', fechaFin.format('YYYY-MM-DD'));
  console.log('📅 Hoy:', hoy.format('YYYY-MM-DD'));
  console.log('⏳ Días restantes:', diasRestantes);
  console.log('📋 Días de alerta configurados:', diasDeAlerta);

  if (diasDeAlerta.includes(diasRestantes)) {
    console.log(`📨 Enviando alerta inmediata (faltan ${diasRestantes} días)...`);

    await enviarCorreo(
      contratoGuardado.CorreoDependencia,
      `🔔 Alerta inmediata: contrato ${contratoGuardado.consecutivo} está próximo a vencer`,
      `El contrato con el contratista ${contratoGuardado.NombreContratista} vence en ${diasRestantes} días (${fechaFin.format('YYYY-MM-DD')}).\nAbogado: ${contratoGuardado.AbogadoAsignado?.nombreAbogado || 'Sin asignar'}.\nTipoContrato: ${contratoGuardado.tipoContrato?.tipoContrato|| 'Sin asignar'}.\nProceso: ${contratoGuardado.proceso?.nombreProceso|| 'Sin asignar'}.`
    );

    contratoGuardado.alertasEnviadas.push(diasRestantes);
    await contratoGuardado.save();
  } else {
    console.log('🔕 No se envía alerta: no coincide con los días de alerta configurados.');
  }

  // Enviar correo de creación
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
