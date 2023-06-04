import { Sequelize } from 'sequelize'
import connection from '../config/db.js';

const Venta = connection.define('ventas', {
  // Model attributes are defined here
  total: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
}, {
  // Other model options go here
});

export default Venta;