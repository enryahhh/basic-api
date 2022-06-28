const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_api', 'root', '', {
  host: 'localhost',
  port:3307,
  dialect: 'mysql'
});

module.exports = sequelize;