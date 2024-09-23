import { getFromLocalStorage, saveToLocalStorage } from "./storage";

export default class Project {
  constructor(name, color, todoCounts) {
    this.id = Project.getAll()
      ? Project.getAll()[Project.getAll().length - 1].id + 1
      : 1;
    this.name = name;
    this.color = color;
    this.todoCounts = todoCounts || 0;
  }

  save() {
    const projects = Project.getAll() || [];
    const foundProject = projects.find((el) => el.name === this.name);
    if (foundProject) return;
    projects.push(this);
    saveToLocalStorage("projects", projects);
  }

  static getAll() {
    return getFromLocalStorage("projects");
  }
}
