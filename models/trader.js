const sequelize = require('sequelize');

module.exports = sequelize.define('trader', {
    id: {
        type: sequelize.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    profileId: {
        type: sequelize.Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize.Sequelize.DATE
    }
});