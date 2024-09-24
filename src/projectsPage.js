import Page from "./Page";
import Project from "./Project";
import createTodos from "./Todos";
import UI from "./UI";

const projectsPage = (function () {
  const ui = UI;

  // create the project page using url and page tree
  const getPage = (url) => {
    const pageTree = [
      {
        element: "header",
        classList: "header",
        children: [
          {
            element: "h1",
            textContent: !url ? "Projects" : url,
          },
        ],
      },
      {
        element: "div",
        classList: "content",
        children: [
          {
            element: "ul",
            classList: !url ? "project-list" : "todo-list",
          },
        ],
      },
    ];

    const page = Page.getPage(pageTree);
    const ul = page[1].firstElementChild;

    if (!url) {
      const projects = Project.getAll();
      ui.createProjectList(ul, projects);
    } else {
      const todos = createTodos.getTodos(url);
      ui.createTodoList(ul, todos);
    }

    return page;
  };

  return { getPage };
})();

export default projectsPage;
