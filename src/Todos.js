import { getFromLocalStorage, saveToLocalStorage } from "./storage";

const Todos = (function () {
  let todos = getFromLocalStorage("todos") || [];

  const saveTodo = (todo) => {
    let todoList = Array.from(todos);
    const storageTodo = todoList.find(
      (el) => el.title.toLowerCase() === todo.title.toLowerCase()
    );
    if (storageTodo) return;
    todos.push(todo);
    saveToLocalStorage("todos", todos);
  };

  const getTodos = (project) => {
    let todoList = Array.from(todos);
    
    if (project) {
      todoList = todoList.filter((todo) => {
        if (todo.category === "projects") {
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

export default Todos;
