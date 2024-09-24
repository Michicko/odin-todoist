import Todos from "./Todos";
import createTodos from "./Todos";
import { generateId } from "./utils";

export default class Task {
  constructor({
    id,
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    category,
    project,
    status
  }) {
    this.id = generateId(id, createTodos.getTodos());
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.category = category;
    this.project = project;
    this.status =  status || "new";
  }

  static update({
    id,
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    category,
    project,
    status,
  }) {
    return new Task({
      id,
      title,
      description,
      dueDate,
      priority,
      notes,
      checklist,
      category,
      project,
      status,
    });
  }
}
