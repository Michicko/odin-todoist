import Page from "./Page";
import Todos from "./Todos";
import UI from "./UI";

const Today = (function () {
  const ui = UI;

  const getPage = () => {
    const todayTodos = Todos.getTodayTodos();
    let sections = {};

    todayTodos.forEach((el) => {
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
    Page.buildPage("Today", ul);
  };

  return {
    getPage,
  };
})();

export default Today;
