const express = require('express');
const morgan = require('morgan');
const users =  require('./routes/userRoutes');
const groups = require('./routes/groupRoutes');
const { logger } = require('./logger');

const app = express();
app.use(express.json());

const myStream = {
    write: (text) => {
        logger.info(text);
    }
};

app.use(morgan('combined', { stream: myStream }));

require('dotenv').config({ path: 'src/config/.env', override: true,  debug: true });

app.use('/', users);
app.use('', groups);

app.use((err, req, res) => {
    res.status(500).send(err.message);
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method}`);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception!', () => {
        console.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
        console.error(err.stack);
        process.exit(1);
    });
});

process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection', () => {
        console.error(`${new Date().toUTCString()} Unhandled rejection:`, err.message);
        console.error(err.stack);
    });
});


module.exports = app;
