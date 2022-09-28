const { Sequelize } = require('sequelize');
const { sequelize } = require('./index');
const { User } = require('./userModel');
const { Group } = require('./groupModel');

const UserGroups = sequelize.define('users_groups', {}, {
    timestamps: false
});


module.exports = { UserGroups };
