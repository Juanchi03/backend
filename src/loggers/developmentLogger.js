const winston = require('winston');

const developmentLogger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = developmentLogger;
