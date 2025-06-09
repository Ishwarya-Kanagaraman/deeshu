const app = require('../app');
const logger = require('../config/logger');
const sequelize  = require('../config/database');
const config = require('../config');
const redisClient = require('../config/redis');
const PORT = config.port || 8083;

// Server instance
let server;

// Database connection and server startup
async function startServer() {
    try {
        // Test database connection
        await sequelize.authenticate();
        logger.info('✅ Database connection established successfully');

        // Sync database (create tables if they don't exist)
        if (config.env === 'development') {
            await sequelize.sync({ alter: true });
            logger.info('✅ Database synchronized');
        }

        // Test Redis connection
        await redisClient.ping();
        logger.info('✅ Redis connection established successfully');



        // Start HTTP server
        server = app.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT} in ${config.env} mode`);
            logger.info(`📱 Health check available at http://localhost:${PORT}/api/health`);

          
        });


        redisClient.set('test_key', 'Hello Redis!');
        redisClient.get('test_key').then(console.log); 

        // Handle server errors
        server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

            switch (error.code) {
                case 'EACCES':
                    logger.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    logger.error(`${bind} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown handling
async function gracefulShutdown(signal) {
    logger.info(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

    // Set a timeout for forced shutdown
    const forceShutdownTimeout = setTimeout(() => {
        logger.error('❌ Forced shutdown due to timeout');
        process.exit(1);
    }, 30000); // 30 seconds timeout for

    try {
        // Stop accepting new connections
        if (server) {
            server.close(async (err) => {
                if (err) {
                    logger.error('❌ Error closing server:', err);
                } else {
                    logger.info('✅ HTTP server closed');
                }

                // Close database connections
                try {
                    await sequelize.close();
                    logger.info('✅ Database connections closed');
                } catch (dbError) {
                    logger.error('❌ Error closing database:', dbError);
                }

                // Close Redis connection
                try {
                    await redisClient.quit();
                    logger.info('✅ Redis connection closed');
                } catch (redisError) {
                    logger.error('❌ Error closing Redis:', redisError);
                }

                // Clear the force shutdown timeout
                clearTimeout(forceShutdownTimeout);

                logger.info('✅ Graceful shutdown completed');
                process.exit(0);
            });
        } else {
            // If no server instance, just close connections
            await sequelize.close();
            await redisClient.quit();
            clearTimeout(forceShutdownTimeout);
            logger.info('✅ Graceful shutdown completed');
            process.exit(0);
        }

    } catch (error) {
        logger.error('❌ Error during graceful shutdown:', error);
        clearTimeout(forceShutdownTimeout);
        process.exit(1);
    }
}

// Signal handlers for graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle process exit
process.on('exit', (code) => {
    logger.info(`👋 Process exiting with code: ${code}`);
});

// Start the server
startServer();

// Export for testing
module.exports = { app, server };