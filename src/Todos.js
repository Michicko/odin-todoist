import { getFromLocalStorage, saveToLocalStorage } from "./storage";

const createTodos = (function () {
  let todos = getFromLocalStorage("todos") || [];

  const saveTodo = (todo) => {
    todos.push(todo);
    saveToLocalStorage("todos", todos);
  };

  const getTodos = (project) => {
    let todoList = Array.from(todos);
    if (project) {
      todoList = todoList.filter((todo) => {
        if (todo.category === "project") {
          if (todo.project === project) {
            return todo;
          }
        }
      });
    }

    return todoList;
  };

  return {
    saveTodo,
    getTodos,
  };
})();

export default createTodos;
