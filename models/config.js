const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'robotradeai.db'
});
module.exports = sequelize;