const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: false,
    trim: true
  },
   nombre:{
 type: String,
    required: false,
    trim: true
  },
  rol: {
    type: String,
    enum: ['admin', 'Invitado','SuperAdministrador'], 
    default: 'Invitado' 
  }
});

module.exports = mongoose.model('Usuario', loginSchema);
