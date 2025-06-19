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
  try {
    const contrato = await Contrato.findByIdAndUpdate(
      req.params.id,
      {
        proceso: req.body.proceso,
        CorreoDependencia: req.body.CorreoDependencia,
        objeto: req.body.objeto,
        FechaInicio: req.body.FechaInicio,
        
      },
      { new: true }
    );
    if (!contrato) return res.status(404).send("contrato not found");
    res.send(contrato);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  crearContratoService,
  obtenerContratosService,
  obtenerContratoPorIdService,
  eliminarContratosService,
  updateContratoService

};
