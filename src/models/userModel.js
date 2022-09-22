const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    username: 'Viachaslau_Lapitski1',
    password: 'admin'
});

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
