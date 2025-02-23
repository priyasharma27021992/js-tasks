const myDeepFlattenArray = (arr) =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val)
        ? acc.concat(myDeepFlattenArray(val))
        : acc.concat(val),
    []
  );

console.log(myDeepFlattenArray([1, [2, 3], [[4], [[5], 6]]]));
