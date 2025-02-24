const myDeepFlattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, myDeepFlattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};

console.log(
  myDeepFlattenObject(
    {
      a: { b: { c: 1 }, d: 2 },
      e: 3,
    },
    "-"
  )
);
