const GroupService = require('../services/groupService');

const gs = new GroupService();

const getGroup = async (req, res) => {
    const { id } = req.params;
    const group = await gs.Get(id);

    if (!group) {
        res.status(404).json({ message: `Group with id ${id} not found` });
    } else {
        res.status(200).json(group);
    }
};

const getAllGroups = async (req, res) => {
    const groups = await gs.GetAll();

    if (!groups.length) {
        res.status(404).json({ message: 'No groups exsisted' });
    } else {
        res.status(200).json(groups);
    }
};

const createGroup = async (req, res) => {
    const group = await gs.Create(req.body);
    res.status(201).json(group);
};

const updateGroup = async (req, res) => {
    const { id } = req.params;
    const group = await gs.Get(id);

    if (!group) {
        res.status(404).json({ message: `Group with id ${id} not found` });
    }

    await gs.Update(req.body, id);

    res.status(200).json(`Group with id ${id} updated successfully`);
};

const deleteGroup = async (req, res) => {
    const { id } = req.params;
    const group = await gs.Get(id);

    if (!group) {
        res.status(404).json({ message: `Group with id ${id} not found` });
    }

    await gs.Delete(id);

    res.status(204).send();
};

module.exports = { getGroup, getAllGroups, createGroup, deleteGroup, updateGroup };
