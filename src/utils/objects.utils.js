export const removeNullValues = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(removeNullValues);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = removeNullValues(value);
      }
      return acc;
    }, {});
  }
  return obj;
};
