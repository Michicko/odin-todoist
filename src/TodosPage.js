import Page from "./Page";
import Todos from "./Todos";
import UI from "./UI";

const TodosPage = (function () {
  const ui = UI;

  const getPage = () => {
    const todos = Todos.getTodosByCategory("todos");

    const todoEls = todos.map((todo) => {
      return ui.createTodo(todo);
    });

    let ul = document.createElement("ul");
    ul.classList += "todo-list";
    ul.append(...todoEls);

    Page.buildPage("Todos", ul);
  };

  return { getPage };
})();

export default TodosPage;
