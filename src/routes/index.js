import { Router } from 'express';
import { autenticar, formularioRegistro, login, logout, perfil, registrar } from '../controllers/usuario.js';
import { carrito, categoria, categorias, compraDetalle, comprar, formularioCreacion, home, registrarLibro, saludo, test } from '../controllers/libro.js';
import protectRoute from '../middleware/protegerRuta.js';
import upload from '../middleware/cargarArchivo.js';

const router = Router();


// auth
router.get('/login', login );
router.post('/login', autenticar );
router.get('/registrar', formularioRegistro );
router.post('/registrar', registrar );
router.post('/logout', logout );

// perfil
router.get('/perfil', protectRoute ,perfil );

// main
router.get('/', protectRoute ,home);

router.get('/crear', protectRoute ,formularioCreacion );
router.post('/registrar-libro', upload.single('imagen') ,registrarLibro );

router.get('/categorias', protectRoute, categorias );
router.get('/categorias/:categoria', protectRoute, categoria );

router.post('/test', upload.single('imagen') ,test);

router.get('/carrito', protectRoute , carrito );
router.get('/comprar', protectRoute , comprar );
router.get('/compra-detalle/:id', protectRoute , compraDetalle );

// router.get('/saludo', protectRoute , saludo );

export default router;