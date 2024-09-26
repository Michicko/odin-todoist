import ElementClass from "./ElementClass";
import Task from "./Task";
import Todos from "./Todos";
import {
  buildDateTime,
  closeDialog,
  formatDate,
  openDialog,
  reloadPage,
} from "./utils";
const taskForm = document.querySelector("#task-form");
const taskDialog = document.querySelector("#task-dialog");

const UI = (function () {
  // create project
  const createProject = (project) => {
    const li = ElementClass.createElementObject("li").addClassList("project");
    const projectColor = ElementClass.createElementObject("span")
      .addClassList("project-color")
      .addTextContent("#")
      .addStyle({ key: "color", value: project.color.value })
      .getElement();
    const p = ElementClass.createElementObject("p")
      .addTextContent(project.name)
      .getElement();
    const todoCounts = ElementClass.createElementObject("span")
      .addTextContent(project.todoCounts)
      .getElement();

    li.appendChildren([projectColor, p, todoCounts]);

    return li.getElement();
  };

  const toggleTodoStatus = (e) => {
    const todoEl = e.target.parentElement.parentElement;
    const id = +todoEl.dataset.id;
    const status = e.target.checked ? "completed" : "uncompleted";
    Todos.updateTodo(id, { status });
  };

  const updateDueDateSelector = (dueDate, value) => {
    const dueDateSelectedValue =
      dueDate.previousElementSibling.lastElementChild;
    dueDateSelectedValue.textContent = value;
  };

  const updateDropdownValue = (dropdown, value) => {
    const dropdownSelectedValueElement = dropdown.parentElement.querySelector(
      ".select-option-name"
    );
    dropdownSelectedValueElement.textContent = value;
  };

  const editTodo = (todo) => {
    openDialog(taskDialog);
    const taskTitleElement = document.querySelector("#title");
    const taskDescriptionElement = document.querySelector("#description");
    const taskDueDateElement = document.querySelector("#due-date");
    const taskPriorityElement = document.querySelector("#priority");
    const taskProjectElement = document.querySelector("#project");

    taskTitleElement.value = todo.title;
    taskDescriptionElement.value = todo.description;
    taskDueDateElement.value = todo.dueDate;
    updateDueDateSelector(
      taskDueDateElement,
      buildDateTime(formatDate(todo.dueDate))
    );
    taskPriorityElement.value = todo.priority;
    updateDropdownValue(taskPriorityElement, todo.priority);
    taskProjectElement.value = todo.project;
    updateDropdownValue(taskProjectElement, todo.project);

    taskForm.setAttribute('data-method', "update");
    taskForm.setAttribute('data-taskid', todo.id);
  };

  // create todo
  const createTodo = (todo) => {
    const li = ElementClass.createElementObject("li").addClassList(
      `todo ${todo.priority} ${
        todo.status === "new" || todo.status === "uncompleted"
          ? ""
          : todo.status
      }`
    );

    let label = ElementClass.createElementObject("label")
      .addClassList("todo-check-label")
      .addProperty({ key: "for", value: `todo-${todo.id}` });

    const checkMark = ElementClass.createElementObject("span")
      .addClassList("mdi mdi-check-bold icon xs")
      .getElement();

    let inputCheck = ElementClass.createElementObject("input")
      .addProperty({ key: "name", value: "todo-check" })
      .addProperty({ key: "type", value: "checkbox" })
      .addId(`todo-${todo.id}`);

    if (todo.status === "completed") {
      inputCheck.addProperty({ key: "checked", value: "checked" });
    }

    const p = ElementClass.createElementObject("p")
      .addTextContent(todo.title)
      .getElement();

    inputCheck = inputCheck.getElement();

    inputCheck.addEventListener("change", toggleTodoStatus);
    p.addEventListener("click", () => editTodo(todo));

    label.appendChildren([checkMark, inputCheck]);

    label = label.getElement();

    li.appendChildren([label, p]);
    li.addProperty({ key: "data-id", value: todo.id });

    return li.getElement();
  };

  // append todo to dom list when created
  const addProjectToList = (project) => {
    const ul = document.querySelector(".project-list");
    const projectEl = createProject(project);
    ul.appendChild(projectEl);
  };

  const addTaskToList = (task) => {
    const ul = document.querySelector(".todo-list");
    const todoEl = createTodo(task);
    ul.appendChild(todoEl);
  };

  // create project list
  const createProjectList = (ul, projects) => {
    ul.innerHTML = "";

    const projectList = projects.map((project) => {
      return createProject(project);
    });

    ul.append(...projectList);
  };

  // create todo list
  const createTodoList = (ul, todos) => {
    ul.innerHTML = "";

    todos = todos.map((todo) => {
      return createTodo(todo);
    });

    ul.append(...todos);
  };

  // create section list
  const createSectionList = (ul, sectionObject) => {
    ul.innerHTML = "";
    let keys = Object.keys(sectionObject);

    keys = keys.map((key) => {
      const section = ElementClass.createElementObject("li");
      const h3 = ElementClass.createElementObject("h3")
        .addTextContent(key)
        .getElement();

      let ul = ElementClass.createElementObject("ul");

      const list = sectionObject[key].map((el) => {
        return createTodo(el);
      });

      ul.appendChildren([...list]);

      ul = ul.getElement();

      section.appendChildren([h3, ul]);
      return section.getElement();
    });
    ul.append(...keys);
  };

  const createDropdownOption = (option) => {
    const optionEl = document.createElement("option");
    optionEl.textContent = option.name;
    optionEl.setAttribute("value", option.value);
    return optionEl;
  };

  const handleDropdownOnchange = (e) => {
    const dropdownSelectedValueElement = e.target.parentElement.querySelector(
      ".select-option-name"
    );
    dropdownSelectedValueElement.textContent = e.target.value;
  };

  const createDropdown = (name, id, options, container) => {
    const select = document.createElement("select");
    select.classList += "dropdown";
    select.id = id;
    select.name = name;
    select.value = options[0].value;
    options = [{ name: `-- select ${name} -- `, value: "" }, ...options];
    const optionList = options.map((option) => {
      return createDropdownOption(option);
    });

    select.addEventListener("change", handleDropdownOnchange);

    select.append(...optionList);
    container.appendChild(select);
  };

  const createSidebarProjectLink = (project) => {
    const button = document.createElement("button");
    button.classList += "btn hoverable with-icon link";
    button.setAttribute("data-url", project.name);
    const icon = document.createElement("span");
    icon.textContent = "#";
    icon.style.color = project.color.value;
    icon.classList += "icon";
    const btnText = document.createElement("span");
    btnText.textContent = project.name[0].toUpperCase() + project.name.slice(1);
    btnText.classList += "btn-text";

    button.append(icon, btnText);
    return button;
  };

  const getSidebarProjectLinks = (container, projects) => {
    const projectsEl = projects.map((project) => {
      return createSidebarProjectLink(project);
    });
    container.append(...projectsEl);
  };

  return {
    createTodo,
    createProject,
    addProjectToList,
    createProjectList,
    createTodoList,
    addTaskToList,
    createSectionList,
    createDropdown,
    getSidebarProjectLinks,
  };
})();

export default UI;
