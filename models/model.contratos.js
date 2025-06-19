const mongoose = require('mongoose');
const Counter = require('./model.counter');

const contratoSchema = new mongoose.Schema({
   codigoContrato: {
    type: String,
    unique: true,
     default: () => Math.floor(100 + Math.random() * 900)
  },
  proceso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proceso',
    required: true
  },
  CorreoDependencia: {
    type: String,
    trim: true
  },
  consecutivo: {
    type: String,
    unique: true
  },
  tipoContrato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoContrato',
    required: true
  },
  objeto: { type: String, required: true, trim: true },
  NombreContratista: { type: String, required: true, trim: true },
  AbogadoAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Abogado',
    required: true
  },
  FechaInicio: { type: Date, required: true },
  FechaFinalización: { type: Date, required: true },
  TeléfonoContratista: { type: String, required: true, trim: true },
  EstadoContrato: {
    type: String,
    required: true,
    enum: ['Vigente', 'Vencido', 'ProximoVencer']
  },
  Adicion: {
    type: Boolean,
    required: true
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
  },
  Vigencia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vigencia',
    required: true
  }
});

contratoSchema.pre('save', async function (next) {
  if (this.isNew && !this.consecutivo) {
    const counter = await Counter.findOneAndUpdate(
      { tipoContrato: this.tipoContrato },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.consecutivo = String(counter.seq).padStart(2, '0');
  }


  next();
});

module.exports = mongoose.model('Contrato', contratoSchema);
