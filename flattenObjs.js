const deepFlattenArray = (arr) => {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(deepFlattenArray(val)) : acc.concat(val),
    []
  );
};

// Example:
console.log(deepFlattenArray([1, [2, [3, [4, 5]], 6], 7]));
// Output: [1, 2, 3, 4, 5, 6, 7]
