const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

// Define custom log format
const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
});

// Create the logger instance
const logger = createLogger({
    level: 'info', // Minimum level to log: error, warn, info, verbose, debug
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // Include stack traces for errors
        customFormat
    ),
    transports: [
        // Console output
        new transports.Console({
            format: combine(colorize(), customFormat),
        }),

        // Save logs to file
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
    exitOnError: false, // Prevent crashing on error logs
});

module.exports = logger;
