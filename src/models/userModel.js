const { Sequelize } = require('sequelize');
const { sequelize } = require('./index');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    age: Sequelize.NUMBER
}, {
    timestamps: false,
    tableName: 'users'
});

module.exports = { User };
