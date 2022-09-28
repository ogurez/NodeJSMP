const express = require('express');
const {
    getGroup,
    getAllGroups,
    createGroup,
    deleteGroup,
    updateGroup
} = require('../controllers/groupControllers');

const router = express.Router();

router.get('/groups/:id', getGroup);

router.get('/groups-all', getAllGroups);

router.post('/groups', createGroup);

router.put('/groups/:id', updateGroup);

router.delete('/groups/:id', deleteGroup);

module.exports = router;
