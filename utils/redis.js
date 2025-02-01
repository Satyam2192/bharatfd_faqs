import { createClient } from 'redis';

const client = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

client.on('error', err => console.error('Redis Client Error:', err));
client.on('connect', () => console.log('Redis Cloud connected'));
client.on('ready', () => console.log(`Redis connected successfully to ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`));
client.on('reconnecting', () => console.log('Redis reconnecting...'));

const getRedisClient = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
};

const get = async (key) => {
  const redis = await getRedisClient();
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

const set = async (key, value, ttl = 300) => {
  const redis = await getRedisClient();
  return redis.setEx(key, ttl, JSON.stringify(value));
};

const del = async (keys) => {
  const redis = await getRedisClient();
  return redis.del(keys);
};

const flush = async () => {
  const redis = await getRedisClient();
  return redis.flushAll();
};

export default {
  get, set, del, flush, getRedisClient
};
