function customPromise(executor) {
  let onResolve, onReject;
  let isResolved = false,
    isRejected = false;
  let value, error;

  this.then = function (resolveCallback) {
    onResolve = resolveCallback;
    if (isResolved) onResolve(value);
    return this;
  };

  this.catch = function (rejectorCallback) {
    onReject = rejectCallback;
    if (isRejected) onReject(value);
    return this;
  };

  function resolver(data) {
    isResolved = true;
    value = data;
    if (onResolve) onResolve(data);
  }

  function rejector(error) {
    isRejected = true;
    error = err;
    if (onReject) onReject(error);
  }

  try {
    executor(resolver, rejector);
  } catch (err) {
    rejector(err);
  }
}
