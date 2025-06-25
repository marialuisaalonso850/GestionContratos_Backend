const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  tipoContrato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoContrato',
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Counter', counterSchema);
