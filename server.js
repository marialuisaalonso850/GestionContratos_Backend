const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const config = require('./config/index');
const abogadoRoutes = require('./routes/routes.crearAbogado');
const procesosRoutes = require('./routes/routes.procesos')
const tipoRoutes = require('./routes/routes.TipoContrato');
const LoginRoutes = require('./routes/routes.login');
const ContratosRoutes = require('./routes/routes.contratos')
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

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}
//  Usar las rutas
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/api/abogados', abogadoRoutes);
app.use('/api/procesos', procesosRoutes);
app.use('/api/tipoContrato', tipoRoutes);
app.use('/api/auth', LoginRoutes); 
app.use('/api/contrato', ContratosRoutes)


app.listen(config.port, '0.0.0.0', () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
  const ip = getLocalIP();
  console.log(`🚀 Swagger disponible en: http://${ip}:${config.port}/api-docs`);
});
