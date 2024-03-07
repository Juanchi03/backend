const winston = require('winston');

const productionLogger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

module.exports = productionLogger;
