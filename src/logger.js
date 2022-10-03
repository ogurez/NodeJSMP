const morgan = require('morgan');
const winston = require('winston');

morgan.token('body', req => {
    return JSON.stringify(req.body);
});

morgan.token('query', req => {
    return JSON.stringify(req.query);
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

logger.add(new winston.transports.Console({
    format: winston.format.simple()
}));

function executionLogger(cb) {
    return function () {
        console.time(`Controller ${cb.name} executed in`);
        const res = cb.apply(this, arguments);
        console.timeEnd(`Controller ${cb.name} executed in`);
        return res;
    };
}

module.exports = { logger, executionLogger };
