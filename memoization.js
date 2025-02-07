function memo(func) {
  let cache = {};

  return function (...args) {
    let key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      let val = func.apply(null, args);
      cache[key] = val;
      return val;
    }
  };
}

function memoWithResolver(func, resolver = (...args) => args.join("-")) {
  let cache = new Map();
  return function (...args) {
    let cacheKey = resolver(args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    } else {
      const value = func.apply(undefined, args);
      cache[cacheKey] = value;
      return cache[cacheKey];
    }
  };
}
