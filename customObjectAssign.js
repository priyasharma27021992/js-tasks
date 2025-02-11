function objectAssign(target, ...sources) {
  if (typeof target !== "object" || target === null) {
    throw new TypeError("Target must be a non-null object");
  }
  for (const source of sources) {
    if (source && typeof source === "object") {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
  }
}
