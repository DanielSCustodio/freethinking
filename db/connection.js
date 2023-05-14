const { Sequelize } = require('sequelize');
require('custom-env').env('development.local');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

try {
  sequelize.authenticate();
  console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`);
} catch (error) {
  console.log(`Não foi possível conectar. Erro: ${error}`);
}

module.exports = sequelize;
