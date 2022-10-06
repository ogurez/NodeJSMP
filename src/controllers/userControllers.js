const UserService = require('../services/userService');
const { logger } = require('../logger');

const us = new UserService();

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await us.Get(id);

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
        res.status(500).send();
    }
};

const getAutoSuggestedUsers = async (req, res) => {
    try {
        const { loginSubString, limit } = req.params;
        const users = await us.GetSuggested(loginSubString, limit);

        if (!users.length) {
            res.status(404).json({ message: 'No users were found' });
        } else {
            res.status(200).json(users);
        }
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
        res.status(500).send();
    }
};

const createUser = async (req, res) => {
    try {
        const user = await us.Create(req.body);
        res.status(201).json(user);
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
        res.status(500).send();
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await us.Get(id);

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        }

        await us.Update(req.body, id);

        res.status(200).json(`User with id ${id} updated successfully`);
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
        res.status(500).send();
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await us.Get(id);

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        }

        await us.Delete(id);

        res.status(204).send();
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
        res.status(500).send();
    }
};

const addUsersToGroup = async (req, res) => {
    try {
        const { group_id, users_id } = req.body;

        await us.AddUsersToGroup(group_id, users_id);

        res.status(204).send();
    } catch (err) {
        logger.error(`${req.method} ${req.params} ${err.message}`);
        res.status(500).send();
    }
};

module.exports = { getUser, getAutoSuggestedUsers, createUser, deleteUser, updateUser, addUsersToGroup };
