const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');


const buffer = fs.readFileSync(path.join(__dirname, '../dtcontratos.json'));

const utf8Text = iconv.decode(buffer, 'latin1');

const jsonCompleto = JSON.parse(utf8Text);


const tablaContratos = jsonCompleto.find(
  item => item.type === 'table' && item.name === 'dtcontratos'
);

const datosContratosCrudos = tablaContratos?.data || [];

function repararTextoRoto(texto) {
  return texto
    .replace(/Ã\u008d/g, 'Í')
    .replace(/Ã\u00d3/g, 'Ó')
    .replace(/Ã\u00a1/g, 'Á')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã\u00cd/g, 'Í')
    .replace(/Ã\u00d1/g, 'Ñ')
    .replace(/Ã\u00a9/g, 'é')
    .replace(/Ã“/g, 'Ó')
    .replace(/Ã\u008d/g, 'Í');
}

function limpiarContrato(raw) {
  const estadoNumerico = parseInt(raw.estado);
  let estadoTexto = 'DESCONOCIDO';

  if (estadoNumerico === 1) estadoTexto = 'ACTIVO';
  else if (estadoNumerico === 2) estadoTexto = 'AMPLIADO';
  else if (estadoNumerico === 3) estadoTexto = 'FINALIZADO';
  else if (estadoNumerico === 4) estadoTexto = 'EN_PROCESO';
  else if (estadoNumerico === 5) estadoTexto = 'ANULADO';
  else if (estadoNumerico === 6) estadoTexto = 'ACTIVO-ACTUALIZADO';

  return {
    id: parseInt(raw.idcontrato),
    consecutivo: parseInt(raw.idconsecutivo),
    fechaIngreso: raw.fechaingreso !== '0000-00-00' ? raw.fechaingreso : null,
   objeto: repararTextoRoto(raw.objeto),
    novedades: raw.novedades,
    estado: estadoTexto

  };
}




const contratosLimpios = datosContratosCrudos.map(limpiarContrato);

// Controlador para enviar al frontend
exports.contratosLimpios = (req, res) => {
  res.json(contratosLimpios);
};
