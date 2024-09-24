import "./styles.css";
import colorDropdown from "./colorDropdown";
import Project from "./Project";
import projectsPage from "./projectsPage";
import Task from "./Task";
import Todos from "./Todos";
import UI from "./UI";

let currentUrl;
const ui = UI;
const pages = [{ url: "projects", page: projectsPage }];
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

const links = document.querySelectorAll(".link");

// Open dialog
const openDialog = (dialog) => {
  dialog.showModal();
};

// close dialog
const closeDialog = (dialog) => {
  dialog.close();
};

// Open date picker
const popOpenDatePicker = (e) => {
  e.target.showPicker();
};

// Open the select dropdown
const openSelect = (select) => {
  select.showPicker();
};

// Build how date and time displays
const buildDateTime = (today, selectedDate) => {
  const [todayMonthDay, todayYear, _todayTime] = today.split(",");
  const [selectedDateMonthDay, selectedDateYear, selectedDateTime] =
    selectedDate.split(",");
  const [todayMonth, todayDay] = todayMonthDay.split(" ");
  const [selectedDateMonth, selectedDateDay] = selectedDateMonthDay.split(" ");

  let date;

  // compare selected date with today
  if (todayYear === selectedDateYear) {
    if (todayMonthDay === selectedDateMonthDay) {
      date = "Today" + selectedDateTime;
    } else if (
      todayMonth === selectedDateMonth &&
      +todayDay + 1 === +selectedDateDay
    ) {
      date = "Tomorrow" + selectedDateTime;
    } else {
      date = selectedDateMonthDay + selectedDateTime;
    }
  } else {
    date = selectedDateMonthDay + selectedDateYear + selectedDateTime;
  }

  return date;
};

// Set and display the selected value from the current dropdown
const setDatePickerValue = (e) => {
  const label = e.target.previousElementSibling;
  const span = label.lastElementChild;
  let today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
  let date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(e.target.value));

  span.textContent = buildDateTime(today, date);
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
  const projectName = projectNameElement.value;
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
};

// create new task
const createTask = (e) => {
  e.preventDefault();
  const taskTitleElement = document.querySelector("#title");
  const taskDescriptionElement = document.querySelector("#description");
  const taskDueDateElement = document.querySelector("#due-date");
  const taskPriorityElement = document.querySelector("#priority");
  const taskProjectElement = document.querySelector("#project");
  const pages = ["inbox", "today"];

  if (!taskTitleElement.value) return;

  const task = new Task({
    title: taskTitleElement.value,
    description: taskDescriptionElement.value,
    dueDate: taskDueDateElement.value,
    priority: taskPriorityElement.value,
    category: taskProjectElement.value ? "projects" : "todos",
    project: taskProjectElement.value,
  });
  Todos.saveTodo(task);

  if (currentUrl === task.project || pages.includes(currentUrl)) {
    ui.addTaskToList(task);
  }

  taskForm.reset();
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
taskForm.addEventListener("submit", createTask);

colorSelectBox.innerHTML = "";
colorDropdown.displayOnDom(colorSelectBox);
