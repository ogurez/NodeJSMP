const GroupService = require('../services/groupService');
const { logger } = require('../logger');

const gs = new GroupService();

const getGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await gs.Get(id);

        if (!group) {
            res.status(404).json({ message: `Group with id ${id} not found` });
        } else {
            res.status(200).json(group);
        }
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await gs.GetAll();

        if (!groups.length) {
            res.status(404).json({ message: 'No groups exsisted' });
        } else {
            res.status(200).json(groups);
        }
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
    }
};

const createGroup = async (req, res) => {
    try {
        const group = await gs.Create(req.body);
        res.status(201).json(group);
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
    }
};

const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await gs.Get(id);

        if (!group) {
            res.status(404).json({ message: `Group with id ${id} not found` });
        }

        await gs.Update(req.body, id);

        res.status(200).json(`Group with id ${id} updated successfully`);
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
    }
};

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await gs.Get(id);

        if (!group) {
            res.status(404).json({ message: `Group with id ${id} not found` });
        }

        await gs.Delete(id);

        res.status(204).send();
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
    }
};


module.exports = { getGroup, getAllGroups, createGroup, deleteGroup, updateGroup };
