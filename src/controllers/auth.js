import { Usuario } from "../model";

const login = async(request, response) => {

  const { token } = request.cookies;

  if( token ) {
    return response.redirect('/');
  }

  return response.render('auth/login', {
    title: 'Login',
  })

};

const autenticar = async(request,response) => {

  await check('correo').isEmail().withMessage('El email es obligatorio').run(request)
  await check('password').notEmpty().withMessage('El password obligatorio').run(request)

  let errors = validationResult(request);

  if( !errors.isEmpty() ) {
    return response.render('login', {
      errors: errors.array(),
      usuario: {
        correo: request.body.correo,
        password: request.body.password
      }
    });
  }

  const { correo, password } = request.body;

  const usuario = await Usuario.findOne({ where: {correo}});

  if(!usuario) {
    return response.render('auth/login', {
      errors: [{msg: 'El usuario no existe'}]
    })
  }

  if(!usuario.verificarPassword(password)){
    return response.render('auth/login', {
      errors: [{msg: 'correo y/o password incorrecto'}]
    });
  }

  const datos  = generarToken({id: usuario.id, nombre: usuario.nombre ,correo: usuario.correo });

  //* una vez validado que no existe un duplicado
  //* redireccionamos al perfil 
  //! no se puede enviar un cuerpo de datos en el redirect 
  return response.cookie('token', datos , {
    maxAge: 24 * 60 * 60 * 1000, //24 horas
    httpOnly: true,
    secure: true
  }).redirect('/');

};

const formularioRegistro = async(request,response) => {

  const { token } = request.cookies;
  request.body;

  if( token ) {
    return response.redirect('/');
  }

  return response.render('auth/registrar', {title: 'Registro'});
};

const registrar = async(request,response) => {

  await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(request);
  await check('apellido').notEmpty().withMessage('El apellido es obligatorio').run(request);
  await check('correo').isEmail().withMessage('Email invalido').run(request);
  await check('password').notEmpty().withMessage('El password es obligatorio').run(request);

  let errors = validationResult(request);

  if( !errors.isEmpty() ) {
    return response.render('auth/registrar', {
      errors: errors.array(),
      usuario: {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        correo: request.body.correo,
      }
    });
  }

  const { nombre, apellido, correo, password } = request.body;

  const usuarioDuplicate = await Usuario.findOne({where: {correo}});

  if( usuarioDuplicate ) {
    return response.render('auth/registrar', {
      errors: [{msg: "El usuario ya existe"}],
      usuario: {
        nombre,
        apellido,
        correo
      }
    })
  }

  await Usuario.create({
    nombre,
    apellido,
    correo,
    password
  });

  let message = 'registrado';
  // window.location = `http://localhost/`;
  return response.redirect(`/login?message=${message}`);
  
};

const logout = async(request,response) => {

  return response.clearCookie('token').status(200).redirect('login');

};