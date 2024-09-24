import { getFromLocalStorage, saveToLocalStorage } from "./storage";

export default class Project {
  constructor(name, color, todoCounts, id) {
    this.id =
      id || (Project.getAll() && Project.getAll().length > 0)
        ? Project.getAll()[Project.getAll().length - 1].id + 1
        : 1;
    this.name = name;
    this.color = color;
    this.todoCounts = todoCounts || 0;
  }

  save() {
    const projects = Project.getAll();
    const foundProject = projects.find((el) => el.name === this.name);
    if (foundProject) return;
    projects.push(this);
    saveToLocalStorage("projects", projects);
  }

  updateTodoCounts(projectId, counts) {
    let projects = Project.getAll();
    const project = projects.find((project) => project.id === projectId);
    if (!project) return;
    projects = projects.filter((project) => project.id !== projectId);
    project.todoCounts = counts;
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
