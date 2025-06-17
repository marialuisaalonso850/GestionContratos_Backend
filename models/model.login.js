const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const loginSchema = new mongoose.Schema({

     correo: {
        type: String,
        required: false,
        trim: true
    },
     codigoUsuario: {
        type: String,
        unique: true,
        default: uuidv4 
    },
})
module.exports = mongoose.model('Login', loginSchema  );