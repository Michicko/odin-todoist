export const generateId = (id, array) => {
  if (id) {
    return id;
  } else {
    return array && array.length > 0 ? array[array.length - 1].id + 1 : 1;
  }
};
