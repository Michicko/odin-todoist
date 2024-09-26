import Page from "./Page";
import Todos from "./Todos";
import UI from "./UI";

const Completed = (function () {
  const ui = UI;

  const getPage = () => {
    const completedTodos = Todos.getCompletedTodos();
    let sections = {};

    completedTodos.forEach((el) => {
      if (!sections[el.category]) {
        sections[el.category] = [];
        sections[el.category].push(el);
      } else {
        sections[el.category].push(el);
      }
    });

    let ul = document.createElement("ul");
    ul.classList += "section-list";
    ul = ui.createSectionList(ul, sections);
    Page.buildPage("Completed", ul);
  };

  return { getPage };
})();

export default Completed;
