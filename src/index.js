import "./styles.css";
import colorDropdown from "./colorDropdown";
import Project from "./Project";
import projectsPage from "./projectsPage";
import Task from "./Task";
import Todos from "./Todos";
import UI from "./UI";
import CompletedPage from "./CompletedPage";
import {
  buildDateTime,
  closeDialog,
  formatDate,
  openDialog,
  reloadPage,
} from "./utils";

const taskDialogBtn = document.querySelector("#open-task-dialog-btn");
const closeTaskDialogBtn = document.querySelector("#close-task-dialog-btn");
const taskDialog = document.querySelector("#task-dialog");
const projectDialog = document.querySelector("#project-dialog");
const projectDialogBtn = document.querySelector("#open-project-dialog-btn");
const closeProjectDialogBtn = document.querySelector(
  "#close-project-dialog-btn"
);
const projectForm = document.querySelector("#project-form");
const taskForm = document.querySelector("#task-form");
const datePickers = document.querySelectorAll(".date-picker");
const dropDownLabels = document.querySelectorAll(".dropdown-label");
const colorSelectBox = document.querySelector(".color-select-box");
const mainContainer = document.querySelector(".main-container");
const sidebarProjectLinks = document.querySelector(".project-btns");

let currentUrl;
const ui = UI;
const priorityDropdownOptions = [];
let projectDropdownOptions = [];
const storageProjects = Project.getAll();

sidebarProjectLinks.innerHTML = "";

// get sidebar projects links
ui.getSidebarProjectLinks(sidebarProjectLinks, storageProjects);

// get projects names
for (let i = 0; i < storageProjects.length; i++) {
  if (!projectDropdownOptions.includes(storageProjects[i].name)) {
    projectDropdownOptions.push(storageProjects[i].name);
  }
}

// create projects dropdown options
projectDropdownOptions = projectDropdownOptions.map((el) => {
  let project = el.toLowerCase();
  return {
    name: project,
    value: project,
  };
});

// create priorities dropdown options
for (let i = 1; i <= 4; i++) {
  priorityDropdownOptions.push({
    name: `p${i}`,
    value: `p${i}`,
  });
}
const priorityBox = document.querySelector(".priority-box");
const projectBox = document.querySelector(".project-box");

// create priorities dropdown
ui.createDropdown("priority", "priority", priorityDropdownOptions, priorityBox);
// create projects dropdown
if (projectDropdownOptions && projectDropdownOptions.length > 0) {
  ui.createDropdown("project", "project", projectDropdownOptions, projectBox);
}

const links = document.querySelectorAll(".link");

// Open date picker
const popOpenDatePicker = (e) => {
  e.target.showPicker();
};

// Open the select dropdown
const openSelect = (select) => {
  select.showPicker();
};

// Set and display the selected value from the current dropdown
const setDatePickerValue = (e) => {
  const label = e.target.previousElementSibling;
  const span = label.lastElementChild;
  let date = formatDate(e.target.value);
  span.textContent = buildDateTime(date);
};

// Select option
const setSelectOptionValue = (e) => {
  const label = e.target.previousElementSibling;
  const paragraph = label.querySelector(".disp");
  paragraph.textContent = e.target.value;
};

// Create new project
const createProject = (e) => {
  e.preventDefault();
  const projectNameElement = document.querySelector("#project-name");
  const projectName = projectNameElement.value.toLowerCase();
  const projectColor = colorDropdown.getCurrentColor();

  if (!projectName || !projectColor) return;

  const project = new Project(projectName, projectColor);
  project.save();

  if (currentUrl === "projects") {
    ui.addProjectToList(project);
  }

  // projectNameElement.value = "";
  projectForm.reset();
  projectDialog.close();
  reloadPage();
};

// create new task
const saveTask = (e) => {
  e.preventDefault();
  const taskTitleElement = document.querySelector("#title");
  const taskDescriptionElement = document.querySelector("#description");
  const taskDueDateElement = document.querySelector("#due-date");
  const taskPriorityElement = document.querySelector("#priority");
  const taskProjectElement = document.querySelector("#project");
  const method = taskForm.dataset.method;
  const taskId = +taskForm.dataset.taskid;

  if (!taskTitleElement.value) return;

  const task = new Task({
    id: taskId,
    title: taskTitleElement.value,
    description: taskDescriptionElement.value,
    dueDate: taskDueDateElement.value,
    priority: taskPriorityElement.value,
    category: taskProjectElement.value ? "projects" : "todos",
    project: taskProjectElement.value,
  });

  if (!method) {
    Todos.saveTodo(task);
    Project.updateTodoCounts(task.project);
    if (currentUrl === task.project) {
      ui.addTaskToList(task);
    }
  } else if(method === 'update') {
    Todos.updateTodo(taskId, task);
  }
  taskDialog.close();
};

// Navigate to page on button click
const gotoPage = (e) => {
  const mainPages = ["projects", "inbox", "search", "today", "completed"];
  const url = e.currentTarget.dataset.url;
  mainContainer.innerHTML = "";
  currentUrl = url;

  let currentPageElement;

  if (!mainPages.includes(url)) {
    currentPageElement = projectsPage.getPage(url);
  } else if (url === "projects") {
    currentPageElement = projectsPage.getPage();
  } else if (url === "completed") {
    currentPageElement = CompletedPage.getPage();
  }

  mainContainer.append(...currentPageElement);
};

taskDialogBtn.addEventListener("click", () => {
  openDialog(taskDialog);
});

closeTaskDialogBtn.addEventListener("click", () => {
  closeDialog(taskDialog);
});

projectDialogBtn.addEventListener("click", () => {
  openDialog(projectDialog);
});

closeProjectDialogBtn.addEventListener("click", () => {
  closeDialog(projectDialog);
});

datePickers.forEach((datePicker) => {
  datePicker.addEventListener("change", setDatePickerValue);
  datePicker.addEventListener("click", popOpenDatePicker);
});

dropDownLabels.forEach((label) => {
  const select = label.nextElementSibling;
  label.addEventListener("click", () => {
    openSelect(select);
  });
  select.addEventListener("change", setSelectOptionValue);
});

links.forEach((link) => {
  link.addEventListener("click", gotoPage);
});

projectForm.addEventListener("submit", createProject);
taskForm.addEventListener("submit", saveTask);

colorSelectBox.innerHTML = "";
colorDropdown.displayOnDom(colorSelectBox);
