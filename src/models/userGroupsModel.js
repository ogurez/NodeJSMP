const { sequelize } = require('../db');

const UserGroups = sequelize.define('users_groups', {}, {
    timestamps: false
});


module.exports = { UserGroups };
