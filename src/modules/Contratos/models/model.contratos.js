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
    required: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
  },
  CorreoDependencia: {
    type: String,
    trim: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
  },
  consecutivo: {
    type: String,
    unique: true
  },
  tipoContrato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoContrato',
    required: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
  },
  objeto: { type: String,
     required: true,
      trim: true,
      historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
    },
  NombreContratista: { type: String, 
    required: true, 
    trim: true,
  historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ] },
  AbogadoAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Abogado',
    required: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
  },
  FechaInicio: { type: Date, required: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
   },
  FechaFinalización: { type: Date,
     required: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
   },
  TeléfonoContratista: { type: String,
     required: true,
     trim: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ] },
  //30 dias alerta, 15 y 10 cambia estado a los
  EstadoContrato: {
    type: String,
    required: true,
    enum: ['Vigente', 'Vencido', 'ProximoVencer'],
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
  },
  Adicion: {
    type: Boolean,
    required: true,
    historial: [
    {
      campo: String,
      anterior: mongoose.Schema.Types.Mixed,
      nuevo: mongoose.Schema.Types.Mixed,
      usuario: String,
      fecha: { type: Date, default: Date.now }
    }
  ]
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
