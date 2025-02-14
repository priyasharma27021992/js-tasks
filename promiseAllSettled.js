function myPromiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    let results = [];

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        results[index] = value;
      });
    });
  });
}
