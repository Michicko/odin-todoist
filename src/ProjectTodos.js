import Page from "./Page";
import Todos from "./Todos";
import UI from "./UI";

const ProjectTodos = (function () {
  const ui = UI;

  const getPage = (url) => {
    const todos = Todos.getTodos(url);

    const todoEls = todos.map((todo) => {
      return ui.createTodo(todo);
    });

    let ul = document.createElement("ul");
    ul.classList += "todo-list";
    ul.append(...todoEls);

    Page.buildPage(url, ul);
  };

  return { getPage };
})();

export default ProjectTodos;
