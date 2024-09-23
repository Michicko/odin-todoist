export default class Task {
  constructor({
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
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.category = category;
    this.project = project;
    this.status = status
  }
}
