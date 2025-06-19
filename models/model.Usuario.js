const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: false,
    trim: true
  },
  rol: {
    type: String,
    enum: ['admin', 'usuario'], 
    default: 'usuario' 
  }
});

module.exports = mongoose.model('Usuario', loginSchema);
