export const generateId = (id, array) => {
  return id || (array && array.length > 0) ? array[array.length - 1].id + 1 : 1;
};
