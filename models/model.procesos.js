const mongoose = require('mongoose');


const procesoSchema = new mongoose.Schema({
codigoProceso: {
        type: String,
        unique: true,
          default: () => Math.floor(100 + Math.random() * 900)
    },
     nombreProceso: {
        type: String,
        required: false,
        trim: true
    }
})
module.exports = mongoose.model('Proceso', procesoSchema );