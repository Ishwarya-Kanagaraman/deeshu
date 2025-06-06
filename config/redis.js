const Redis = require("ioredis");
const config = require("./index");

const redisClient = new Redis({
    host: config.redis.host,
    port: config.redis.port
    // password: config.redis.password
});

module.exports = redisClient;