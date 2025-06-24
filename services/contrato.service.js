const Contrato = require('../models/model.contratos');
const {ContratoCreado} = require('./email.service')

const crearContratoService = async (datosContrato) => {
  const nuevoContrato = new Contrato(datosContrato);
  await nuevoContrato.save();

  const contratoGuardado = await Contrato.findById(nuevoContrato._id)
    .populate('proceso', 'nombreProceso')
    .populate('tipoContrato', 'tipoContrato')
    .populate('AbogadoAsignado', 'nombreAbogado');

  await ContratoCreado(
    contratoGuardado.CorreoDependencia,
    contratoGuardado.proceso.nombreProceso,         
    contratoGuardado.CorreoDependencia,
    contratoGuardado.consecutivo,
    contratoGuardado.tipoContrato.tipoContrato,    
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

const eliminarContratosService = async()=>{
  try{
    const contrato = await Contrato.findByIdAndDelete(req.params.id);
     if (!contrato) return res.status(404).send("Contrato not found");

 res.send(contrato);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateContratoService(req, res) {
  const nuevosDatos = req.body;
  console.log(nuevosDatos);
  
  const usuario = req.usuario?.nombre || 'Sistema'; 
   console.log(usuario);

  try {
    const contrato = await Contrato.findById(req.params.id);

    if (!contrato) return res.status(404).send("Contrato no encontrado");

    const historialNuevasEntradas = [];

    // Compara campo por campo
    for (let campo in nuevosDatos) {
      if (contrato[campo] !== undefined && contrato[campo] !== nuevosDatos[campo]) {
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

    // Guardar cambios solo si hubo modificaciones
    if (historialNuevasEntradas.length > 0) {
      contrato.historial.push(...historialNuevasEntradas);
      await contrato.save();
      res.json({ mensaje: 'Contrato actualizado con historial guardado', contrato });
    } else {
      res.json({ mensaje: 'No hubo cambios en los campos', contrato });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en la actualización', error });
  }
}


module.exports = {
  crearContratoService,
  obtenerContratosService,
  obtenerContratoPorIdService,
  eliminarContratosService,
  updateContratoService

};
