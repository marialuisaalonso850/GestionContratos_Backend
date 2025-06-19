module.exports = function (rolesPermitidos) {
  return (req, res, next) => {
    const rol = req.usuario?.rol;
    if (!rol || !rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
    }else{
      console.log("permitido");
      
    }
    next();
  };
};
