import { Libro, Venta, VentaDetalle } from "../model/index.js";
import Categoria from "../model/Categoria.js";
import formatearFecha from "../helpers/formatear-fecha.js";

const home = async (request, response) => {


  const [libros, categorias] = await Promise.all([
    Libro.findAll(),
    Categoria.findAll(),
  ])


  const librosWithCategory = libros.map(libro => {

    categorias.map(categoria => {

      if (categoria.dataValues.id === libro.dataValues.categoriaId) {
        return libro.dataValues.categoria = categoria.dataValues.categoria
      }

    });

    return libro.dataValues
  });

  const { usuario } = request;

  return response.render('home', {
    title: 'Home',
    navbar: true,
    usuario,
    libros: librosWithCategory
  });
};

const formularioCreacion = async (request, response) => {

  const { usuario } = request;

  // No es admin, no entra a esa ruta
  // if(usuario.rol !== 'main_rol') {
  //   return response.redirect('/');
  // }

  return response.render('libros/crear', {
    title: 'Crear',
    navbar: true,
    usuario
  })

};


const registrarLibro = async (request, response) => {

  const [categorias] = await Promise.all([Categoria.findAll()]);

  const categoriaExist = await Categoria.findOne({ where: { categoria: request.body.categoria } });

  if (!categoriaExist) {
    return response.json({ msg: "categoria no existe" })
  }

  //* mapeamos las categoias de la BD y comparas el nombre de la categoria enviada por el form
  //* comparandola con la BD y cuando coincida pasamos el ID de esa categoria
  categorias.map(categoria => {
    if (request.body.categoria === categoria.dataValues.categoria) {
      request.body.categoria = categoria.dataValues.id
    }
  })

  const { titulo, autor, precio, stock, categoria: categoriaId } = request.body;

  let precioFormat = Number(precio);

  let stockFormat = Number(stock);

  const { filename } = request.file;
  const libro = await Libro.create({ titulo, autor, precio: precioFormat, stock: stockFormat, poster: filename, categoriaId });
  return response.json(libro)

  // return response.redirect('/crear');

};

const categorias = async (request, response) => {

  const { usuario } = request;

  const categorias = await Categoria.findAll();

  return response.render('libros/categorias', {
    title: 'Categorias',
    navbar: true,
    categorias,
    usuario
  })

};

const categoria = async (request, response) => {


  const { categoria } = request.params;
  const { usuario } = request;

  // TODO: verificar que la categoria existe en la BD, para evitar problemas
  const categoriaExist = await Categoria.findOne({ where: { categoria } });

  if (!categoriaExist) {

    let message = 'No se encuentra informacion relacionada esa categoria'

    return response.render('libros/categoria', {
      title: 'Categoria',
      navbar: true,
      message
    });
  }

  const categoriaId = await Categoria.findOne({ where: { categoria } });

  const librosCategoria = await Libro.findAll({ where: { categoriaId: categoriaId.dataValues.id } });

  return response.render('libros/categoria', {
    title: 'Categoria',
    navbar: true,
    categoria,
    libros: librosCategoria,
    usuario
  });

};

const test = async (request, response) => {


  const [categorias] = await Promise.all([Categoria.findAll()]);

  const categoriaExist = await Categoria.findOne({ where: { categoria: request.body.categoria } });

  if (!categoriaExist) {
    return response.json({ msg: "categoria no existe" })
  }

  //* mapeamos las categoias de la BD y comparas el nombre de la categoria enviada por el form
  //* comparandola con la BD y cuando coincida pasamos el ID de esa categoria
  categorias.map(categoria => {
    if (request.body.categoria === categoria.dataValues.categoria) {
      request.body.categoria = categoria.dataValues.id
    }
  })

  const { autor, titulo, precio, stock, categoria: categoriaId } = request.body;
  const { filename } = request.file;
  console.log(request.body);

  let precioFormat = Number(precio);

  let stockFormat = Number(stock);

  const libro = await Libro.create({ titulo, autor, precio: precioFormat, stock: stockFormat, poster: filename, categoriaId });


  return response.status(200).json(libro);
};

const carrito = async (request, response) => {

  const { usuario } = request;
  const { carrito } = request.cookies;

  if (carrito) {
    return response.render('compra/carrito', {
      title: 'Carrito',
      navbar: true,
      usuario,
    })
  }

  return response.render('compra/carrito', {
    title: 'Carrito',
    navbar: true,
    usuario,
    message: true
  })

};


const comprar = async (request, response) => {

  const { carrito } = request.cookies

  if (carrito) {
    let total = 0;
    let carritoParse = JSON.parse(carrito)

    carritoParse.forEach(field => total += (field.precio * field.cantidad));

    const venta = await Venta.create({ total, usuarioId: request.usuario.dataValues.id });
    let ventaId = venta.dataValues.id;

    carritoParse.forEach(libro => {
      let subtotal = (libro.cantidad * libro.precio);
      VentaDetalle.create({ cantidad: libro.cantidad, precio: libro.precio, subtotal, ventaId, libroId: libro.idProducto });
    });

    response.cookie('mensaje', 'ok');

    return response.cookie('carrito', carrito, { maxAge: 0 }).redirect('/carrito');
  }
  
  return response.cookie('carrito', carrito, { maxAge: 0 }).render('home', {
    title: 'Home',
    navbar: true
  })


};

const compraDetalle = async (request, response) => {

  request.usuario.dataValues.createdAt = (formatearFecha(request.usuario.dataValues.createdAt));

  const { id } = request.params

  const compraDetalle = await VentaDetalle.findAll({ where: { ventaId: id }, include: Libro });
  let detalles = [];

  compraDetalle.forEach(compra => {
    detalles.push({
      titulo: compra.dataValues.libro.dataValues.titulo,
      precio: compra.dataValues.precio,
      cantidad: compra.dataValues.cantidad,
      subtotal: compra.dataValues.subtotal
    })
  });


  response.render('compra/compra-detalle-perfil', {
    title: 'Perfil',
    navbar: true,
    usuario: request.usuario,
    detalles
  })

};

const saludo = (request, response) => {

  console.log('saludando')
  return response.send('asdasd');
};

export {
  home,
  formularioCreacion,
  registrarLibro,
  categorias,
  categoria,
  carrito,
  comprar,
  compraDetalle,
  test,
  saludo
}