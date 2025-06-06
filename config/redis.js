

require('dotenv').config();
const { createClient } = require('redis');

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PASSWORD || undefined
});

redisClient.connect()
    .then(() => console.log('✅ Redis connected'))
    .catch(err => console.error('❌ Redis error', err));

module.exports = redisClient;
