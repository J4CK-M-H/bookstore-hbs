import { Sequelize } from 'sequelize'
import connection from '../config/db.js';

const Libro = connection.define('libros', {
  // Model attributes are defined here
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  autor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precio: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
  ,
  poster: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  // Other model options go here
});

export default Libro;