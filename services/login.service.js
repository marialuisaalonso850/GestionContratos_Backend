const { enviarCodigoCorreo } = require('./email.service');
const Usuario = require('../models/model.Usuario');

const codigosTemporales = {}; 


const enviarCodigoService = async (correo) => {
 const correoBuscado = correo.trim().toLowerCase();
const usuario = await Usuario.findOne({ correo: correoBuscado });
   console.log(correo);
  if (!usuario) {
    throw new Error('El correo no está registrado');
  }

  const codigo = Math.floor(100000 + Math.random() * 900000);

  codigosTemporales[correo] = {
    codigo,
    expiracion: Date.now() + 5 * 60 * 1000 
  };

  await enviarCodigoCorreo(correo, codigo);

  return true;
};


const verificarCodigoService = (correo, codigoIngresado) => {
  const dato = codigosTemporales[correo];

  if (!dato || Date.now() > dato.expiracion) {
    return { success: false, message: 'Código inválido o expirado' };
  }

  if (parseInt(codigoIngresado) === dato.codigo) {
    delete codigosTemporales[correo];
    return { success: true, message: 'Código correcto, acceso concedido' };
  } else {
    return { success: false, message: 'Código incorrecto' };
  }
};

module.exports = {
  enviarCodigoService,
  verificarCodigoService
};
