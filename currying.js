const _ = Symbol("_");

function curryWithPlacefolder(fn) {
  return function curried(...args) {
    if (args.length >= fn.length && !args.includes(_)) {
      return fn.apply(this, args);
    }
    return (...newArgs) => {
      const mergedArgs = args.map((arg) =>
        arg === _ && newArgs.length ? newArgs.shift() : arg
      );
      return curried(...mergedArgs, ...newArgs);
    };
  };
}

function curry(fn) {
  return function curried(...args) {
    if (args.length > fn.length) {
      return fn.apply(this, args);
    }
    return (...newArgs) => curried(...newArgs, ...args);
  };
}
