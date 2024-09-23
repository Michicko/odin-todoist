import colorDropdown from "./colorDropdown";
import "./styles.css";

const taskDialogBtn = document.querySelector("#open-task-dialog-btn");
const closeTaskDialogBtn = document.querySelector("#close-task-dialog-btn");
const taskDialog = document.querySelector("#task-dialog");
const projectDialog = document.querySelector("#project-dialog");
const projectDialogBtn = document.querySelector("#open-project-dialog-btn");
const closeProjectDialogBtn = document.querySelector(
  "#close-project-dialog-btn"
);
const datePickers = document.querySelectorAll(".date-picker");
const dropDownLabels = document.querySelectorAll(".dropdown-label");
const colorSelectBox = document.querySelector(".color-select-box");

const openDialog = (dialog) => {
  dialog.showModal();
};

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

// Set and display the selected value from the current dropwodn
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

const setSelectOptionValue = (e) => {
  const label = e.target.previousElementSibling;
  const paragraph = label.querySelector(".disp");
  paragraph.textContent = e.target.value;
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

const options = [
  {
    name: "red",
    value: "red",
  },
  {
    name: "blue",
    value: "blue",
  },
  {
    name: "brown",
    value: "brown",
  },
];


colorSelectBox.innerHTML = ""
colorSelectBox.append(...colorDropdown(options));

projectDialog.showModal();
