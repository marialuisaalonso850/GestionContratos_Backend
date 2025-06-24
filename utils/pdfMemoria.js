const PDFDocument = require('pdfkit');

function generarPDFStream(jsonData, res) {
  const doc = new PDFDocument({ margin: 30, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="contratos.pdf"');

  doc.pipe(res);

  doc.fontSize(16).text('Listado de Contratos', { align: 'center' });
  doc.moveDown();

  jsonData.forEach((item, index) => {
    doc.fontSize(10).text(`${index + 1}. ${item.nombre} - ${item.descripcion} (${item.estado})`);
    doc.moveDown(0.5);
  });

  doc.end();
}

const xlsx = require('xlsx');

function generarExcelBuffer(jsonData, res) {
  const ws = xlsx.utils.json_to_sheet(jsonData);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Contratos');

  // ✅ Crear un buffer (NO se escribe en disco)
  const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

  // ✅ Configurar headers y enviar
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="contratos.xlsx"');
  res.send(buffer);
}


moodule.exports ={generarPDFStream,generarExcelBuffer}