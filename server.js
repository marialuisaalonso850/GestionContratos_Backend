
require('dotenv').config();
const os = require('os');
const config = require('./src/modules/Contratos/config/index');
const app = require('./src/app');

const PORT = config.port || process.env.PORT || 3000;


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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor Express escuchando en http://localhost:${PORT}`);
  const ip = getLocalIP();
  console.log(`📚 Swagger disponible en: http://${ip}:${PORT}/api-docs`);
});
