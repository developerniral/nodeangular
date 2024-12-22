const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Create logs folder if it doesn't exist
const logsFolderPath = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsFolderPath)) {
    fs.mkdirSync(logsFolderPath);
}

const errorOptions = {
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message }) => {
            let errorMessage;
            try {
                errorMessage = JSON.parse(message);
            } catch (error) {
                errorMessage = message;
            }
            return `[${timestamp}] ${level}: "${errorMessage.message}" eventTriggered:"${errorMessage.eventTriggered}" data: ${message}`;
        })
    ),
    filename: path.join(logsFolderPath, 'error.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 20,
    colorize: false,
};

const errorLogger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File(errorOptions),
    ],
    exitOnError: false,
});

module.exports = errorLogger;
