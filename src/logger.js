const morgan = require('morgan');
const winston = require('winston');
const { combine, json, errors, prettyPrint } = winston.format;

morgan.token('body', req => {
    return JSON.stringify(req.body);
});

morgan.token('query', req => {
    return JSON.stringify(req.query);
});


const logger = winston.createLogger({
    level: 'info',
    format:  combine(errors({ stack: true }), json(), prettyPrint()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console(),
        new winston.transports.Http(),
        new winston.transports.File({ filename: 'combined.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exception.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'rejections.log' })
    ],
    exitOnError: false
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
