import "./styles.css";

const taskDialogBtn = document.querySelector(".add-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const closeDialogBtn = document.querySelector("#close-dialog-btn");

const openTaskDialog = () => {
  taskDialog.showModal();
};

const closeTaskDialog = () => {
  taskDialog.close();
};

taskDialog.showModal();

taskDialogBtn.addEventListener("click", openTaskDialog);
closeDialogBtn.addEventListener('click', closeTaskDialog);
