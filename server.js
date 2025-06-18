const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/index');
const abogadoRoutes = require('./routes/routes.crearAbogado');
const procesosRoutes = require('./routes/routes.procesos')
const tipoRoutes = require('./routes/routes.TipoContrato');
const LoginRoutes = require('./routes/routes.login');
const ContratosRoutes = require('./routes/routes.contratos')

const app = express();
const PORT = 3000;

app.use(express.json()); 


mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error de conexión:', err));

// ✅ Usar las rutas
app.use('/api/abogados', abogadoRoutes);
app.use('/api/procesos', procesosRoutes);
app.use('/api/tipoContrato', tipoRoutes);
app.use('/api/auth', LoginRoutes); 
app.use('/api/contrato', ContratosRoutes)


app.listen(config.port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
