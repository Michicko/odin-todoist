import { getFromLocalStorage, saveToLocalStorage } from "./storage";

const createTodos = (function () {
  let todos = getFromLocalStorage("todos") || [];

  const saveTodo = (todo) => {
    todos.push(todo);
    saveToLocalStorage("todos", todos);
  };

  const getTodos = () => {
    return Array.from(todos);
  };

  return {
    saveTodo,
    getTodos,
  };
})();

export default createTodos;