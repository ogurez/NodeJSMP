const express = require('express');
const users =  require('./routes/userRoutes');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use('/', users);

module.exports = app;
