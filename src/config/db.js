'use strict'; 
import  Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;

  const connection = new Sequelize(DB_NAME, DB_USER ,DB_PASS, {

  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorAliases: false,
  //* opcion para desabilitar que las querys salgan por consola
  logging: false

});

export default connection;