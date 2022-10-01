const crypto = require('crypto');
const { Group } = require('../models/groupModel');

class GroupService {
    async Create(group) {
        const groupWithId = {
            ...group,
            id: crypto.randomUUID()
        };
        await Group.create(groupWithId);
        return groupWithId;
    }

    async Get(id) {
        const group = await Group.findByPk(id);
        return group;
    }

    async GetAll() {
        const groups = await Group.findAll();

        return groups;
    }

    async Update(groupBody, id) {
        const group = await Group.findByPk(id);

        if (!group) {
            throw new Error('Group with provided id was not found in DB');
        }

        const groupId = group.id;
        await Group.update(groupBody, { where: {
            id: groupId
        } });

        return group;
    }

    async Delete(id) {
        const group = await Group.findByPk(id);

        if (!group) {
            throw new Error('Group with provided id was not found in DB');
        }

        const groupId = id;
        await Group.destroy({
            where: {
                id: groupId
            }
        });

        return group;
    }
}

module.exports = GroupService;
