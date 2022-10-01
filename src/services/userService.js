const crypto = require('crypto');
const { Op } = require('sequelize');
const sequelize  = require('../db');
const { User } = require('../models/userModel');
const { UserGroups } = require('../models/userGroupsModel');

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

        if (!user) {
            throw new Error('User with provided id was not found in DB');
        }

        const userId = user.id;
        await User.update(userBody, { where: {
            id: userId
        } });

        return user;
    }

    async Delete(id) {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('User with provided id was not found in DB');
        }

        const userId = id;
        await User.destroy({
            where: {
                id: userId
            }
        });

        return user;
    }

    async AddUsersToGroup(groupIds, userIds) {
        const userGroupsData = userIds.map(v => v = { id: crypto.randomUUID(), groupId: groupIds, userId: v });

        try {
            const res = await sequelize.transaction(async (v) => {
                await UserGroups.bulkCreate(userGroupsData, { transaction: v });
            });

            return res;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = UserService;
