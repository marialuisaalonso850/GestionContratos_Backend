const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const xlsx = require('xlsx');

function exportarAPDF(jsonData, nombreArchivo) {
  const rutaArchivo = path.join(__dirname, nombreArchivo);
  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  doc.pipe(fs.createWriteStream(rutaArchivo));

  doc.fontSize(16).text('Listado de Contratos', { align: 'center' });
  doc.moveDown();

  jsonData.forEach((item, index) => {
    doc.fontSize(10).text(`${index + 1}. ${item.nombre} - ${item.descripcion} (${item.estado})`);
    doc.moveDown(0.5);
  });

  doc.end();
  return rutaArchivo;
}

function exportarAExcel(jsonData, nombreArchivo) {
  const rutaArchivo = path.join(__dirname, '../archivos', nombreArchivo);
  const ws = xlsx.utils.json_to_sheet(jsonData);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Contratos');
  xlsx.writeFile(wb, rutaArchivo);
  return rutaArchivo;
}

module.exports = {
  exportarAExcel,
  exportarAPDF
};
