const Proceso = require('../models/model.procesos');


const  nuevoProceso = async (req, res) => {
  try {
    const nuevoProceso = new Proceso(req.body);
    const ProcesoGuardado = await nuevoProceso.save();
    res.status(201).json(ProcesoGuardado );
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear proceso', error: err.message });
  }
};

module.exports = {
  nuevoProceso
};