import { getFromLocalStorage, saveToLocalStorage } from "./storage";
import Task from "./Task";

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

  const updateTodo = (todoId, updatedTodo) => {
    let todoList = Array.from(todos);
    let storageTodo = todoList.find((el) => el.id === todoId);
    if (!storageTodo) return;
    storageTodo = Task.update({ ...storageTodo, ...updatedTodo });    
    todoList = todoList.filter((todo) => todo.id !== storageTodo.id);
    todoList.push(storageTodo);
    saveToLocalStorage("todos", todoList);
  }

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
    updateTodo
  };
})();

export default Todos;
