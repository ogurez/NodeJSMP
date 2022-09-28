const { Sequelize } = require('sequelize');
const { sequelize } = require('./index');

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
