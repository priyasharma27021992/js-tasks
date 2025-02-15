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

if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(
      promises.map(function (promise) {
        return promise.then(
          function (value) {
            return { status: "fulfilled", value: value };
          },
          function (reason) {
            return { status: "rejected", reason: reason };
          }
        );
      })
    );
  };
}
