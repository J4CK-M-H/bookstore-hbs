import jwt from 'jsonwebtoken';


const generarToken = (data) => {

  return jwt.sign({id: data.id, nombre: data.nombre, correo: data.correo}, process.env.JWT_KEY, {
    expiresIn: '10d'
  });
};

export {
  generarToken
}