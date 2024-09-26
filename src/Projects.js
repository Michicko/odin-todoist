import Page from "./Page";
import Project from "./Project";
import UI from "./UI";

const Projects = (function () {
  const ui = UI;

  const getPage = () => {
    const projects = Project.getAll();

    const projectEls = projects.map((project) => {
      return ui.createProject(project);
    });

    let ul = document.createElement("ul");
    ul.classList += "project-list";
    ul.append(...projectEls);

    Page.buildPage("Projects", ul);
  };

  return { getPage };
})();

export default Projects;
