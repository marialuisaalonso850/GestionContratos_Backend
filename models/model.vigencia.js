const mongoose = require('mongoose');

const VigenciaSchema = new mongoose.Schema({
  codigoVigencia: {
    type: String,
    unique: true,
    default: () => Math.floor(100 + Math.random() * 900)
  },
  Vigencia: {
    type: Number,
    required: true,
    default: () => new Date().getFullYear(), 
  }
});

module.exports = mongoose.model('Vigencia', VigenciaSchema);
