const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');

const Group = sequelize.define('group', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'group'
});

module.exports = { Group };
