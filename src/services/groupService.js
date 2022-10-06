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
        await Group.update(groupBody, { where: {
            id
        } });

        return 1;
    }

    async Delete(id) {
        await Group.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = GroupService;
