const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contratoSchema = new mongoose.Schema({
    codigoContrato: {
        type: String,
        unique: true,
        default: uuidv4 
    },
    proceso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proceso',
        required: true
    },
    CorreoDependencia: {
        type: String,
        required: false,
        trim: true
    },
     consecutivo: {
        type: String,
        unique: true,
        default: uuidv4 
    },
    tipoContrato: {
        type: String,
        required: true,
        enum: ['Prestación de servicios', 'Fijo', '...']
    },
    objeto: {
        type: String,
        required: true,
        trim: true
    },
    NombreContratista: {
        type: String,
        required: true,
        trim: true
    },
    AbogadoAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Abogado',
    required: true
    },
    FechaInicio: {
        type: Date,
        required: true
    },
    FechaFinalización: {
        type: Date,
        required: true
    },
    TeléfonoContratista: {
        type: String,
        required: true,
        trim: true
    },
    EstadoContrato: {
        type: String,
        required: true,
        enum: ['Vigente', 'Vencido', 'ProximoVencer']
    },
    Adicion: {
        type: Boolean,
        required: true,
        trim: true
    },
    TipoAdicion: {
        type: String,
        enum: ['Prorroga', 'Adición'],
        required: function () {
        return this.Adicion === true;
    },
        trim: true
    },
    ValorAgregado: {
        type: String,
        required: function () {
        return this.Adicion === true && this.TipoAdicion === 'Adición';
    },
    trim: true
    },
    FechaProrroga: {
    type: Date,
    required: function () {
      return this.Adicion === true && this.TipoAdicion === 'Prorroga';
    }
  },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contrato', contratoSchema);