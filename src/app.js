const express = require('express');
const morgan = require('morgan');
const users =  require('./routes/userRoutes');
const groups = require('./routes/groupRoutes');
const { logger } = require('./logger');

const app = express();
app.use(express.json());

app.use(morgan('Method :method :url has been called with body :body and query params :query - :response-time ms'));

require('dotenv').config({ path: 'src/config/.env', override: true,  debug: true });

app.use('/', users);
app.use('/', groups);

app.use((err, req, res,) => {
    logger.error(`ERROR!@!
        - STATUS: ${err.status || 500}
        - Status message:${res.statusMessage} 
        - Error message:${err.message}
        - URL:${req.originalUrl}
        - METHOD:${req.method}`);
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
