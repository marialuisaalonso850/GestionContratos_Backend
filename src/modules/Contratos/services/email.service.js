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
    from: `"PLAT-EPA" <${config.emailUser}>`,
    to: destinatario,
    subject: "Código de acceso",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <!-- Header / Nav -->
        <div style="background-color: #002d72; color: white; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">Codigo Acceso</h2>
        </div>
        
        <!-- Cuerpo -->
        <div style="background-color: #ffffff; padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hola,</p>
          <p style="font-size: 16px; color: #333;">
            Aquí está tu código de acceso. Por favor ingresa este código en la aplicación para continuar:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; padding: 15px 30px; font-size: 24px; background-color: #002d72; color: white; border-radius: 6px;">
              ${codigo}
            </span>
          </div>
          <p style="font-size: 14px; color: #666;">
            Si no solicitaste este código, puedes ignorar este correo de manera segura.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #002d72; color: white; text-align: center; padding: 10px;">
          <small>&copy; 2025 epa.gov.co. Todos los derechos reservados.</small>
        </div>
      </div>
    `,
  });
}


const enviarCorreo = async (destinatario, asunto, mensajePlano) => {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #004080; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">🔔 ALERTA TEMPRANA</h2>
      </div>
      <div style="background-color: #ffffff; padding: 20px;">
        <p style="font-size: 16px; color: #333;">${mensajePlano}</p>
      </div>
      <div style="background-color: #f0f0f0; color: #666; text-align: center; padding: 10px; font-size: 14px;">
        www.epa.gov.co
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"EPA DTIC" <desarrollo.tic@epa.gov.co>',
      to: config.emailUser,
      subject: asunto,
      text: mensajePlano,
      html: htmlTemplate
    });

    console.log(`✉️ Correo enviado a ${destinatario}: ${info.messageId}`);
  } catch (error) {
    console.error(` Error al enviar correo a ${destinatario}:`, error);
  }
};

async function ContratoCreado(destinatario, proceso, CorreoDependencia, consecutivo, tipoContrato, nombreContratista) {
  try {
    await transporter.sendMail({
      from: 'EPA DTIC <desarrollo.tic@epa.gov.co>',
      to: destinatario,
      subject: "Contrato Creado",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <!-- Header / Nav -->
        <div style="background-color: #004aad; color: white; padding: 15px; text-align: center;">
          <h2 style="margin: 0;">EPA - Contrato Creado</h2>
        </div>
        
        <!-- Cuerpo -->
        <div style="background-color: #ffffff; padding: 30px;">
          <p style="font-size: 16px; color: #333;">
            Se ha creado un nuevo contrato con los siguientes detalles:
          </p>
          <ul style="font-size: 16px; color: #333; line-height: 1.8;">
            <li><strong>Proceso:</strong> ${proceso}</li>
            <li><strong>Correo Dependencia:</strong> ${CorreoDependencia}</li>
            <li><strong>Consecutivo:</strong> ${consecutivo}</li>
            <li><strong>Tipo Contrato:</strong> ${tipoContrato}</li>
            <li><strong>Nombre Contratista:</strong> ${nombreContratista}</li>
          </ul>
          <p style="font-size: 14px; color: #666;">
            Por favor revisa esta información o ponte en contacto si tienes alguna duda.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #004aad; color: white; text-align: center; padding: 10px;">
          <small>&copy; 2025 EPA DTIC. Todos los derechos reservados.</small>
        </div>
      </div>
      `
    });

    console.log(`Correo de confirmación enviado a ${destinatario}`);
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
}


module.exports = { enviarCodigoCorreo,ContratoCreado,enviarCorreo };
