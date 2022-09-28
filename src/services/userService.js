const crypto = require('crypto');
const { Op } = require('sequelize');
const { User } = require('../models/userModel');
const { Group } = require('../models/groupModel');

class UserService {
    async Create(user) {
        const userWithId = {
            ...user,
            id: crypto.randomUUID()
        };
        await User.create(userWithId);
        return userWithId;
    }

    async Get(id) {
        const user = await User.findByPk(id);
        return user;
    }

    async GetSuggested(loginSubstr, limit) {
        const users = await User.findAll({
            where: {
                login: {
                    [Op.startsWith]: loginSubstr || ''
                } },
            order: [
                ['login', 'ASC']
            ],
            limit: Number(limit) || 10
        });

        return users;
    }

    async Update(userBody, id) {
        const user = await User.findByPk(id);
        const userId = user.id;
        await User.update(userBody, { where: {
            id: userId
        } });

        return user;
    }

    async Delete(id) {
        const userId = id;
        const user = await User.findByPk(id);
        await User.destroy({
            where: {
                id: userId
            }
        });

        return user;
    }

    async AddUsersToGroup(groupId, userIds) {
        console.log(123);
        await Group.create({ id: groupId, name: 'new group', users: [userIds] }, { include: [{ association: User, as: 'users' }] });

        return userIds;
    }
}

module.exports = UserService;
