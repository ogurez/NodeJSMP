const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    username: 'Viachaslau_Lapitski1',
    password: 'admin'
});

module.exports = { sequelize };
