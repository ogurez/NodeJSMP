const UserService = require('../services/userService');

const us = new UserService();

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await us.Get(id);

    if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
    } else {
        res.status(200).json(user);
    }
};

const getAutoSuggestedUsers = async (req, res) => {
    const { loginSubString, limit } = req.params;
    const users = await us.GetSuggested(loginSubString, limit);

    if (!users.length) {
        res.status(404).json({ message: 'No users were found' });
    } else {
        res.status(200).json(users);
    }
};

const createUser = async (req, res) => {
    const user = await us.Create(req.body);
    res.status(201).json(user);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await us.Get(id);

    if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
    }

    await us.Update(req.body, id);

    res.status(200).json(`User with id ${id} updated successfully`);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await us.Get(id);

    if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
    }

    await us.Delete(id);

    res.status(204).send();
};

const addUsersToGroup = async (req, res) => {
    const { group_id, users_id } = req.body;

    if (!group_id) {
        res.status(404).json({ message: `Group with id ${group_id} not found` });
    }

    if (!users_id) {
        res.status(404).json({ message: 'Please provide user ids which you want to add to the group' });
    }

    await us.AddUsersToGroup(group_id, users_id);

    res.status(204).send();
};

module.exports = { getUser, getAutoSuggestedUsers, createUser, deleteUser, updateUser, addUsersToGroup };
