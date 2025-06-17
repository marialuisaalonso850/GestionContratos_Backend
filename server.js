const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const abogadoRoutes = require('./routes/routes.crearAbogado');
const procesosRoutes = require('./routes/routes.procesos');
//const tipoRoutes = require('./routes/routes.TipoContrato');

const app = express();
const PORT = 3000;

app.use(express.json()); 


mongoose.connect(process.env.BD_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error de conexión:', err));

// ✅ Usar las rutas
app.use('/api/abogados', abogadoRoutes);
app.use('/api/procesos', procesosRoutes);
app.use('/api/tipoContrato', procesosRoutes);


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
