function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    let results = [];
    let completed = 0;
    let total = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === total) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(1);
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000));

myPromiseAll([p1, p2, p3]).then(console.log).catch(console.error);

/*
  1. The function takes an array of promises
  2. it returns a new promise that resolves when all promises resolve or rejects if any promise reject
  3. it maintains an array of resolved values in the same order as the input
  4. if a promise rejects, the entire Promise.all rejects immediately

 */
