import { getFromLocalStorage, saveToLocalStorage } from "./storage";

export default class Project {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  save() {
    const projects = Project.getAllProjects();
    const foundProject = projects.find((el) => el.name === this.name);
    if (foundProject) return;
    projects.push(this);
    saveToLocalStorage("projects", projects);
  }

  static getAll() {
    return getFromLocalStorage("projects");
  }
}
