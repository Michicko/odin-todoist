// import {colorSelect }from "./colorSelect";
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
const selectOptions = document
  .querySelector(".select-options")
  .querySelectorAll(".option-check");

const options = [
  {
    name: "red",
    color: "red",
  },
  {
    name: "blue",
    color: "blue",
  },
  {
    name: "brown",
    color: "brown",
  },
];

const openDialog = (dialog) => {
  dialog.showModal();
};

const closeDialog = (dialog) => {
  dialog.close();
};

// Open task dialog form
// const openTaskDialog = () => {
//   taskDialog.showModal();
// };

// close task dialog form
// const closeTaskDialog = () => {
//   taskDialog.close();
// };

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

const selectColorOption = (e) => {
  const option = e.target;
  const selectedValue =
      option.parentElement.parentElement.previousElementSibling;
    const selectedColor = selectedValue.querySelector(".option-color");
    const selectedName = selectedValue.querySelector(".option-name");
    const selectedCheck = selectedValue.querySelector("#selected-value");
    const value = e.target.value;

    selectedName.textContent = value;
    selectedColor.style.background = value;
    selectedCheck.checked = false;
    option.checked = true;
}

// taskDialog.showModal();

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

selectOptions.forEach((option) => {
  option.addEventListener("click", selectColorOption);
});

// colorSelectBox.append(colorSelect(options));

projectDialog.showModal();
