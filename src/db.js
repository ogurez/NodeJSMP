const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'mydb', /* Should be updated if you are using the db with another name */
    username: 'Viachaslau_Lapitski1', /* Should be updated if yours username */
    password: 'admin' /* Should be updated with your password */
});

module.exports = sequelize;
