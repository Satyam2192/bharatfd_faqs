const { LRUCache } = require('lru-cache');

const cache = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 5 // 5 minutes
});

const coalesceAsync = async (key, asyncFn) => {
  const cached = cache.get(key);
  if (cached) return cached;

  const result = await asyncFn();
  cache.set(key, result);
  return result;
};

module.exports = {
  cache,
  coalesceAsync
};
