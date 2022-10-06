const express = require('express');
const { userSchema, validateSchema, userGroupSchema } = require('../utils/validation');
const {
    getUser,
    getAutoSuggestedUsers,
    createUser,
    deleteUser,
    updateUser,
    addUsersToGroup
} = require('../controllers/userControllers');
const { executionLogger } = require('../logger');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

router.get('/users/:id', executionLogger(getUser));

router.get('/users-auto-suggest', executionLogger(getAutoSuggestedUsers));

router.post('/users', validateSchema(userSchema), executionLogger(createUser));

router.put('/users/:id', validateSchema(userSchema), executionLogger(updateUser));

router.delete('/users/:id', executionLogger(deleteUser));

router.post('/users-to-group/', validateSchema(userGroupSchema), executionLogger(addUsersToGroup));

module.exports = router;
