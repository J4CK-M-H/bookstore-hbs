import Categoria from './Categoria.js';
import Libro from './Libro.js';
import Usuario from './Usuario.js';
import Venta from './Venta.js';
import VentaDetalle from './VentaDetalle.js';



Libro.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Venta.belongsTo(Usuario, {foreignKey: 'usuarioId'});
VentaDetalle.belongsTo(Venta, {foreignKey: 'ventaId'});
VentaDetalle.belongsTo(Libro, {foreignKey: 'libroId'});

export {
  Libro,
  VentaDetalle,
  Venta,
  Usuario
}