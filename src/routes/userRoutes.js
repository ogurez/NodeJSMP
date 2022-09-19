const crypto = require('crypto');
const express = require('express');
const { userSchema, validateSchema } = require('../utils/validation');

const router = express.Router();
const USERS = [];

router.get('/', (req, res) => {
    res.json({ ok: true });
});

router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = USERS.find((v) => v.id === id);

    if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
    } else {
        res.status(200).json(user);
    }
});

router.get('/users-auto-suggest', (req, res) => {
    const users = USERS.sort((a, b) => a.login.localeCompare(b.login))
        .filter((v) => v.login.startsWith(req.query.loginSubstring))
        .slice(0, Number(req.query.limit) || 10);

    if (!users.length) {
        res.status(404).json({ message: 'No users were found' });
    } else {
        res.status(200).json(users);
    }
});

router.post('/users', validateSchema(userSchema), (req, res) => {
    const user = {
        ...req.body,
        id: crypto.randomUUID(),
        isDeleted: false
    };
    USERS.push({ ...user });
    res.status(201).json(user);
});

router.put('/users/:id', validateSchema(userSchema), (req, res) => {
    const userIndex = USERS.findIndex((v) => v.id === req.params.id);

    if (userIndex !== -1) {
        USERS[userIndex] = { ...USERS[userIndex], ...req.body };
        res.status(200).json(USERS[userIndex]);
    } else {
        res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }
});

router.put('/users-delete/:id', (req, res) => {
    const userIndex = USERS.findIndex((v) => v.id === req.params.id);

    if (userIndex !== -1) {
        USERS[userIndex] = { ...USERS[userIndex], isDeleted: true };
        res.status(204).send();
    } else {
        res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }
});

module.exports = router;
