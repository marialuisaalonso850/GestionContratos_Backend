const mongoose = require('mongoose');

const TipocontratoSchema = new mongoose.Schema({
codigoTipoContrato: {
        type: String,
        unique: true,
        default: () => Math.floor(100 + Math.random() * 900)
    },
     tipoContrato: {
        type: String,
        required: false,
        trim: true
    }
})
module.exports = mongoose.model('TipoContrato', TipocontratoSchema );