
const {enviarCodigoService,verificarCodigoService} = require('../services/login.service');

const enviarCodigo = async (req, res) => {
  const { correo } = req.body;

  try {
    await enviarCodigoService(correo);
    res.json({ success: true, message: 'Código enviado' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const verificarCodigo = (req, res) => {
  const { correo, codigoIngresado } = req.body;

  const resultado = verificarCodigoService(correo, codigoIngresado);
  if (resultado.success) {
    res.json(resultado);
  } else {
    res.status(400).json(resultado);
  }
};

module.exports = {
  enviarCodigo,
  verificarCodigo
};
