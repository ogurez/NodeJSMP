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
    const user = await us.Update(req.body, id);

    if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
    }

    res.status(200).json(`User with id ${id} updated successfully`);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await us.Delete(id);

    if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
    }

    res.status(204).send();
};

module.exports = { getUser, getAutoSuggestedUsers, createUser, deleteUser, updateUser };
