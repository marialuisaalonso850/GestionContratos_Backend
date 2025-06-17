const mongoose = require('mongoose');

const AbogadoSchema = new mongoose.Schema({
  codigoAbogado: {
    type: String,
    unique: true,
     default: () => Math.floor(100 + Math.random() * 900)
  },
  nombreAbogado: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Abogado', AbogadoSchema);
