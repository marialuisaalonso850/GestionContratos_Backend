const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET|| 'secreto';

const crearToken = (usuario) => {
  const payload = {
    id: usuario.id,
    nombre: usuario.correo,
    rol: usuario.rol || 'usuario'
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });
  return token;
};

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};
module.exports = {verificarToken,crearToken};
