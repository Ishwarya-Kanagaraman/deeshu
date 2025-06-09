module.exports = {

    // Rate Limiting Config
    rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
    rateLimitMaxRequests: 100,        // Max 100 requests per IP per window

    // Redis Config (if needed for RedisStore setup)
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
        // password: 'your_redis_password' // Optional
    },
    env:"development",
    port:8083,
    db:{
        database: process.env.DB_NAME ,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
};
  