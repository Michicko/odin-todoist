export const saveToLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getFromLocalStorage = (name) => {
  const value = JSON.parse(localStorage.getItem(name));
  return value;
};

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};
