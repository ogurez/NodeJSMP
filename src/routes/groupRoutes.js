const express = require('express');
const { groupSchema, validateSchema } = require('../utils/validation');
const {
    getGroup,
    getAllGroups,
    createGroup,
    deleteGroup,
    updateGroup
} = require('../controllers/groupControllers');

const router = express.Router();

router.get('/groups/:id', getGroup);

router.get('/groups', getAllGroups);

router.post('/groups', validateSchema(groupSchema), createGroup);

router.put('/groups/:id', validateSchema(groupSchema), updateGroup);

router.delete('/groups/:id', deleteGroup);

module.exports = router;
