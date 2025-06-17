
const express = require('express');
const app = express();


const PORT = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

app.get('/saludo', (req, res) => {
  res.json({ mensaje: '¡Saludos desde el servidor Express!' });
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
