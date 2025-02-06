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
