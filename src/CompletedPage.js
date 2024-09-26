import Page from "./Page";
import Todos from "./Todos";
import UI from "./UI";

const CompletedPage = (function () {
  const ui = UI;

  const getPage = () => {
    const pageTree = [
      {
        element: "header",
        classList: "header",
        children: [
          {
            element: "h1",
            textContent: "completed",
          },
        ],
      },
      {
        element: "div",
        classList: "content",
        children: [
          {
            element: "ul",
            classList: "section-list",
          },
        ],
      },
    ];

    const page = Page.getPage(pageTree);
    const ul = page[1].firstElementChild;
    let sections = {};

    Todos.getTodos()
      .filter((todo) => todo.status === "completed")
      .forEach((el) => {
        if (!sections[el.category]) {
          sections[el.category] = [];
          sections[el.category].push(el);
        } else {
          sections[el.category].push(el);
        }
      });

    ui.createSectionList(ul, sections);

    return page;
  };

  return { getPage };
})();

export default CompletedPage;
