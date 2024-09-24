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
    this.status = "new";
  }
}
