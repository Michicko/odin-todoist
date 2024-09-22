import "./styles.css";
import { format } from "date-fns";

const taskDialogBtn = document.querySelector(".add-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const closeDialogBtn = document.querySelector("#close-dialog-btn");
const datePickers = document.querySelectorAll(".date-picker");
const dropDownLabels = document.querySelectorAll(".dropdown-label");

// Open task dialog form
const openTaskDialog = () => {
  taskDialog.showModal();
};

// close task dialog form
const closeTaskDialog = () => {
  taskDialog.close();
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
  const paragraph = label.querySelector('.disp');
  paragraph.textContent = e.target.value;
};

taskDialog.showModal();

taskDialogBtn.addEventListener("click", openTaskDialog);

closeDialogBtn.addEventListener("click", closeTaskDialog);

datePickers.forEach((datePicker) => {
  datePicker.addEventListener("change", setDatePickerValue);
  datePicker.addEventListener("click", popOpenDatePicker);
});

dropDownLabels.forEach((label) => {
  const select = label.nextElementSibling;
  label.addEventListener("click", () => {
    openSelect(select);
  });
  select.addEventListener('change', setSelectOptionValue)
});
