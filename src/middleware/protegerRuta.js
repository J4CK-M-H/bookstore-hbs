import jwt from 'jsonwebtoken'
import Usuario from '../model/Usuario.js';

const protectRoute = async(request,response, next) => {

  const { token } = request.cookies;

  if(!token) {
    console.log('no hay datos miera');
    return response.redirect('login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY) ;
    const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id);
  
    if(usuario) {
      request.usuario = usuario;
      // console.log('requested usuario: ', usuario);
    }else {
      return response.redirect('/login');
    }
  
    // console.log(request.cookies);
  
    return next();
  } catch (error) {
    console.log('mal');
    return response.clearCookie('token').redirect('/login')
  }
 
};

export default protectRoute;