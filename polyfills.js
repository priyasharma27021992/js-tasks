function customPromise(executor) {
  let isResolved = false,
    isRejected = false,
    isCalled = false;
  let onResolve, onReject, value, error;

  // then for the chaining, the then we attach with promise
  this.then = function (resolveCallback) {
    onResolve = resolveCallback;
    if (!isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  //error is for the
  this.error = function (rejectCallback) {
    onReject = rejectCallback;
    if (!isCalled) {
      isCalled = true;
      onReject(error);
    }
    return this;
  };

  function resolver(data) {
    isResolved = true;
    value = data;
    if (typeof onResolve === "function" && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
  }
  function rejector(err) {
    isRejected = true;
    error = err;
    if (typeof onReject === "function" && !isCalled) {
      isCalled = true;
      onReject(error);
    }
  }

  try {
    executor(resolver, rejector);
  } catch (err) {
    console.error(err);
  }
}

//checking promise
let myPromise = new customPromise((resolve, reject) => {
  setTimeout(() => resolve("Success", 1000));
});

myPromise.then((data) => console.log(data));
