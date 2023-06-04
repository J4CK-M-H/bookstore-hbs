  import { Sequelize } from 'sequelize'
  import connection from '../config/db.js';
  
  const VentaDetalle = connection.define('venta_detalles', {
    // Model attributes are defined here
    cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    precio: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    },
    subtotal: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    },
  }, {
    // Other model options go here
  });
  
  export default VentaDetalle;