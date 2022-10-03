const express = require('express');
const { groupSchema, validateSchema } = require('../utils/validation');
const {
    getGroup,
    getAllGroups,
    createGroup,
    deleteGroup,
    updateGroup
} = require('../controllers/groupControllers');
const { executionLogger } = require('../logger');

const router = express.Router();

router.get('/groups/:id', executionLogger(getGroup));

router.get('/groups', executionLogger(getAllGroups));

router.post('/groups', validateSchema(groupSchema), executionLogger(createGroup));

router.put('/groups/:id', validateSchema(groupSchema), executionLogger(updateGroup));

router.delete('/groups/:id', executionLogger(deleteGroup));

module.exports = router;
