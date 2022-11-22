const Redis = require("ioredis");

const redis = new Redis({
  host: "redis-19808.c299.asia-northeast1-1.gce.cloud.redislabs.com",
  port: 19808,
  username: "default",
  password: "yobvBr6VLy0y5spDJowmvO3HRPn4tnmP",
});

module.exports = redis;