const deepFlattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, deepFlattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};

// Example:
console.log(
  deepFlattenObject({
    a: { b: { c: 1 }, d: 2 },
    e: 3,
  })
);

// Output: { 'a.b.c': 1, 'a.d': 2, 'e': 3 }
