const  sequelize = require('../db');
const { User } = require('./userModel');
const { Group } = require('./groupModel');

const UserGroups = sequelize.define('users_groups', {}, {
    timestamps: false,
    tableName: 'user_groups'
});

User.belongsToMany(Group, { through: UserGroups });
Group.belongsToMany(User, { through: UserGroups });


module.exports = { UserGroups };
