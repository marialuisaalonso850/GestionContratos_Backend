const nodemailer = require('nodemailer');
const config = require('../config/index');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  }
});

async function enviarCodigoCorreo(destinatario, codigo) {
  await transporter.sendMail({
    from: `"Tu App" <${config.emailUser}>`,
    to: destinatario,
    subject: "Código de acceso",
    text: `Tu código de acceso es: ${codigo}`,
  });
}

module.exports = { enviarCodigoCorreo };
