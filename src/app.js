const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../swagger')
const config = require('./modules/Contratos/config/index');
const abogadoRoutes = require('./modules/Contratos/routes/routes.crearAbogado');
const procesosRoutes = require('./modules/Contratos/routes/routes.procesos')
const tipoRoutes = require('./modules/Contratos/routes/routes.TipoContrato');
const LoginRoutes = require('./modules/Contratos/routes/routes.login');
const ContratosRoutes = require('./modules/Contratos/routes/routes.contratos')
const lectura = require('./modules/Contratos/routes/routes.leerArchivo')
const router = express.Router();
const os = require('os');

const app = express();
const PORT = 3000;

app.use(express.json()); 


mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB :)'))
.catch((err) => console.error(' Error de conexión:', err));

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/api/abogados', abogadoRoutes);
app.use('/api/procesos', procesosRoutes);
app.use('/api/tipoContrato', tipoRoutes);
app.use('/api/auth', LoginRoutes); 
app.use('/api/contrato', ContratosRoutes);
app.use('/api/datos', lectura)

module.exports = app;