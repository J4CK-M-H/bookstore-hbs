import { Sequelize } from 'sequelize'
import connection from '../config/db.js';
import bcrypt from "bcrypt";

const Usuario = connection.define('usuarios', {
  // Model attributes are defined here
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false
  },
  correo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rol: {
    type: Sequelize.STRING,
    defaultValue: "usuario"
  }
}, {
  // Other model options go here
  hooks: {
    beforeCreate: async function(user) {

      const salt = await bcrypt.genSalt(10); 
      user.password = await bcrypt.hash(user.password, salt);

    }
  },
  scopes: {
    eliminarPassword: {
      attributes: {
        exclude: ['password', 'updatedAt']
      }
    }
  }
});

Usuario.prototype.verificarPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

export default Usuario;