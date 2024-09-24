import { getFromLocalStorage, saveToLocalStorage } from "./storage";
import { generateId } from "./utils";

class Project {
  constructor(name, color, todoCounts, id) {
    this.id = generateId(id, Project.getAll());
    this.name = name;
    this.color = color;
    this.todoCounts = todoCounts || 0;
  }

  save() {
    const projects = Project.getAll();
    const foundProject = projects.find((el) => el.name.toLowerCase() === this.name.toLowerCase());
    if (foundProject) return;
    projects.push(this);
    saveToLocalStorage("projects", projects);
  }

  static updateTodoCounts(projectName) {
    let projects = Project.getAll();
    const project = projects.find((project) => project.name.toLowerCase() === projectName.toLowerCase());
    if (!project) return;
    projects = projects.filter((project) => project.name !== projectName);
    project.todoCounts += 1;
    projects.push(project);
    saveToLocalStorage("projects", projects);
  }

  static activate(project) {
    return new Project(
      project.name,
      project.color,
      project.todoCounts,
      project.id
    );
  }

  static getAll() {
    return getFromLocalStorage("projects") || [];
  }
}

export default Project