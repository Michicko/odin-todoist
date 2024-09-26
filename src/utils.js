export const generateId = (id, array) => {
  console.log(id);
  if (id) {
    return id;
  } else {
    return array && array.length > 0 ? array[array.length - 1].id + 1 : 1;
  }
};

export const reloadPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 200);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

// Build how date and time displays
export const buildDateTime = (selectedDate) => {
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
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

// Open dialog
export const openDialog = (dialog) => {
  dialog.showModal();
};

// close dialog
export const closeDialog = (dialog) => {
  dialog.close();
};
