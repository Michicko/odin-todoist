import { getFromLocalStorage, saveToLocalStorage } from "./storage";
import Task from "./Task";
import { formatDate, reloadPage } from "./utils";

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
  };

  const getCompletedTodos = () => {
    const completedTodos = todos.filter((todo) => todo.status === 'completed');
    return completedTodos;
  }

  const getTodayTodos = () => {
    const today = formatDate(new Date());
    const [todayMonthDay, todayYear, _todayTime] = today.split(",");
    const [todayMonth, todayDay] = todayMonthDay.split(" ");
    const todayTodos = todos.filter((todo) => {
      const dueDate = formatDate(todo.dueDate);
      const [dueDateMonthDay, dueDateYear, _dueDateTime] = dueDate.split(",");
      const [dueDateMonth, dueDateDay] = dueDateMonthDay.split(" ");
      if (
        todayDay === dueDateDay &&
        todayMonth === dueDateMonth &&
        todayYear === dueDateYear
      ) {
        return todo;
      }
    });
    return todayTodos;
  };

  return {
    saveTodo,
    getTodos,
    updateTodo,
    getTodosByCategory,
    getTodayTodos,
    getCompletedTodos
  };
})();

export default Todos;
