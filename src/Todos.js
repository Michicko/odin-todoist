import { getFromLocalStorage, saveToLocalStorage } from "./storage";
import Task from "./Task";
import { reloadPage } from "./utils";

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
    reloadPage();
  };

  const updateTodo = (todoId, updatedTodo) => {
    let todoList = Array.from(todos);
    let storageTodo = todoList.find((el) => el.id === todoId);
    if (!storageTodo) return;
    storageTodo = Task.update({ ...storageTodo, ...updatedTodo });
    todoList = todoList.filter((todo) => todo.id !== storageTodo.id);
    todoList.push(storageTodo);
    saveToLocalStorage("todos", todoList);
    reloadPage();
  };

  const getTodos = (project) => {
    let todoList = Array.from(todos);

    if (project) {
      todoList = todoList.filter((todo) => {
        return todo.category === "projects" && todo.project === project;
      });
    }

    return todoList;
  };

  const getTodosByCategory = (category) => {
    return Array.from(todos).filter((todo) => todo.category === category);
  }

  return {
    saveTodo,
    getTodos,
    updateTodo,
    getTodosByCategory
  };
})();

export default Todos;
