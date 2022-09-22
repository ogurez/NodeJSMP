const express = require('express');
const { userSchema, validateSchema } = require('../utils/validation');
const {
    getUser,
    getAutoSuggestedUsers,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userControllers');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

router.get('/users/:id', getUser);

router.get('/users-auto-suggest', getAutoSuggestedUsers);

router.post('/users', validateSchema(userSchema), createUser);

router.put('/users/:id', validateSchema(userSchema), updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
