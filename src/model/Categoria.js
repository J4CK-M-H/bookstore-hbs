import { Sequelize } from 'sequelize'
import connection from '../config/db.js';

const Categoria = connection.define('categorias', {
  // Model attributes are defined here
  categoria: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

export default Categoria;