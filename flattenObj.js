// const myDeepFlattenObject = (obj, prefix = "") => {
//   return Object.keys(obj).reduce((acc, key) => {
//     const newKey = prefix ? `${prefix}.${key}` : key;
//     if (typeof obj[key] === "object" && obj[key]) {
//       Object.assign(acc, myDeepFlattenObject(obj[key], newKey));
//     } else {
//       acc[newKey] = obj[key];
//     }
//     return acc;
//   }, {});
// };

// console.log(myDeepFlattenObject({ a: { b: { c: 2 } } }));

const myDeepFlattenObject = (obj, prefix = "") => {
  return Object(keys).reduce((acc, key) => {
    let newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, myDeepFlattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  });
};

console.log(myDeepFlattenObject({ a: { b: { c: 2 } } }));
