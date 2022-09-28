const express = require('express');
const users =  require('./routes/userRoutes');
const groups = require('./routes/groupRoutes');

const app = express();

require('dotenv').config({ path: 'src/config/.env', override: true,  debug: true });

app.use(express.json());
app.use('/', users);
app.use('', groups);

module.exports = app;
