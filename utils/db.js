const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/telemedicine', {
  dialect: 'postgres',
});

module.exports = sequelize;
