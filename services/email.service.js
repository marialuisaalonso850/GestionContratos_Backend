const nodemailer = require('nodemailer');
const config = require('../config/index');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  }
});

async function enviarCodigoCorreo(destinatario,codigo) {
  await transporter.sendMail({
    from: `"Tu App" <${config.emailUser}>`,
    to: destinatario,
    subject: "Código de acceso",
    text: `Tu código de acceso es: ${codigo}`,
  });
}

async function ContratoCreado(destinatario,proceso,CorreoDependencia, consecutivo,tipoContrato,nombreContratista) {
  try{
  await transporter.sendMail({
     from: '"EPA DTIC" <desarrollo.tic@epa.gov.co>',
      to: destinatario,
      subject: "Correo Creado",
      html: `
      <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
       <br><br>
              <br>
              - Proceso: ${proceso}
              <br>
              - CorreoDependencia: ${CorreoDependencia}
              <br>
              - consecutivo: ${consecutivo}
              <br>
              - tipoContrato: ${tipoContrato}
              <br>
              - nombreContratista: ${nombreContratista}            
              <br><br>
      </body>
      `
  });
    console.log(console.log(`Correo de confirmación enviado a ${destinatario}`));
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
}

module.exports = { enviarCodigoCorreo,ContratoCreado };
