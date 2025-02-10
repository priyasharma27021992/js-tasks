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

function coinChange(coins, amount) {
  const cache = {};

  function dp(n) {
    if (n === 0) return 0;
    if (n < 0) return -1;
    if (n in cache) return cache[n];

    let min = Infinity;

    for (const coin of coins) {
      const subproblem = dp(n - coin);

      if (subproblem >= 0) min = Math.min(min, subproblem + 1);
    }

    cache[n] = min !== Infinity ? min : -1;

    return cache[n];
  }

  return dp(amount);
}
