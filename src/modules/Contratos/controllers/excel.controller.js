const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// Leer y decodificar el archivo JSON
const buffer = fs.readFileSync(path.join(__dirname, '../utils/dtcontratos.json'));
const utf8Text = iconv.decode(buffer, 'latin1');
const jsonCompleto = JSON.parse(utf8Text);

// Buscar tabla de contratos
const tablaContratos = jsonCompleto.find(
  item => item.type === 'table' && item.name === 'dtcontratos'
);

const datosContratosCrudos = tablaContratos?.data || [];

// Reparar texto con errores de encoding
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

// Procesar cada contrato y mapear datos limpios
function limpiarContrato(raw) {
  const estadoNumerico = parseInt(raw.estado);
  const TipoContrato = parseInt(raw.idcontrato);

  let TipoContra = 'Desconocido';
  let estadoTexto = 'DESCONOCIDO';

  // Estado
  if (estadoNumerico === 1) estadoTexto = 'ACTIVO';
  else if (estadoNumerico === 2) estadoTexto = 'AMPLIADO';
  else if (estadoNumerico === 3) estadoTexto = 'FINALIZADO';
  else if (estadoNumerico === 4) estadoTexto = 'EN_PROCESO';
  else if (estadoNumerico === 5) estadoTexto = 'ANULADO';
  else if (estadoNumerico === 6) estadoTexto = 'ACTIVO-ACTUALIZADO';

  // Tipo de contrato
  if (TipoContrato === 1) TipoContra = 'CLAUSULADO_SIMPLIFICADO';
  else if (TipoContrato === 2) TipoContra = 'DE_ARRENDAMIENTO';
  else if (TipoContrato === 3) TipoContra = 'DE_COMPRAVENTA';
  else if (TipoContrato === 4) TipoContra = 'DE_CONSULTORIA';
  else if (TipoContrato === 5) TipoContra = 'DE_CONVENIO';
  else if (TipoContrato === 6) TipoContra = 'DE_OBRA';
  else if (TipoContrato === 7) TipoContra = 'DE_SUMINISTROS';
  else if (TipoContrato === 8) TipoContra = 'PRESTACION_DE_SERVICIO';

  return {
    TipoContrato: TipoContra,
    consecutivo: parseInt(raw.idconsecutivo),
    conanio: raw.conanio ? raw.conanio.trim() : null ,
    fechaIngreso: raw.fechaingreso !== '0000-00-00' ? raw.fechaingreso : null,
    objeto: repararTextoRoto(raw.objeto),
    novedades: raw.novedades,
    estado: estadoTexto
  };
}

const contratosLimpios = datosContratosCrudos.map(limpiarContrato);

// Obtener todos los contratos
const contratosLimpiosLim = (req, res) => {
  res.json(contratosLimpios);
};

// Filtrar por tipo de contrato
const FiltrarPorTipoContrato = (req, res) => {
  const { tipo } = req.params;
  const tipoBuscado = tipo.toUpperCase();

  const contratosFiltrados = contratosLimpios.filter(
    c => c.TipoContrato === tipoBuscado
  );

  if (contratosFiltrados.length === 0) {
    return res.status(404).json({ mensaje: `No se encontraron contratos con tipo: ${tipoBuscado}` });
  }

  return res.json(contratosFiltrados);
};

// Filtrar por coincidencias en novedades (como barra de búsqueda del contratista)
const FiltrarPorContratista = (req, res) => {
  const contratista = req.params.nombre || req.query.nombre;

  console.log('Buscando contratista:', contratista);

  if (!contratista) {
    return res.status(400).json({ error: 'No se proporcionó el nombre o palabra para buscar en novedades.' });
  }

  const buscado = contratista.toLowerCase();

  const contratosFiltrados = contratosLimpios.filter(
    c => c.novedades && c.novedades.toLowerCase().includes(buscado)
    
    
  );

  if (contratosFiltrados.length === 0) {
    return res.status(404).json({ mensaje: `No se encontraron contratos con coincidencias: ${contratista}` });
  }

  return res.json({
    cantidadResultados: contratosFiltrados.length,
    contratos: contratosFiltrados
  });
};

const FiltrarPorAnio = (req, res) => {
  const { anio } = req.params;
  console.log('🔍 Año recibido:', anio);

  if (!anio) {
    return res.status(400).json({ error: 'No se proporcionó el año para buscar.' });
  }

  // Para depurar: imprime todos los años únicos
  const añosUnicos = [...new Set(contratosLimpios.map(c => c.conanio && c.conanio.trim()))];
  console.log('📅 Años disponibles:', añosUnicos);

  // Filtra ignorando espacios
  const contratosFiltrados = contratosLimpios.filter(
    c => c.conanio && c.conanio.trim() === anio.trim()
  );

  console.log('✅ Contratos encontrados:', contratosFiltrados.length);

  if (contratosFiltrados.length === 0) {
    return res.status(404).json({ mensaje: `No se encontraron contratos para el año: ${anio}` });
  }

  return res.json(contratosFiltrados);
};


module.exports = {
  contratosLimpiosLim,
  FiltrarPorTipoContrato,
  FiltrarPorContratista,
  FiltrarPorAnio

};
