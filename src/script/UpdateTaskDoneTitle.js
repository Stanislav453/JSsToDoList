export const UpdateTaskDoneTitle = (element) => {
  const taskDoneTile = document.querySelector("#task-done-title");
  const taskDoneTitleText = "Your done task for today";

  if (element.length > 0) {
    taskDoneTile.textContent = taskDoneTitleText;
  } else {
    taskDoneTile.textContent = "";
  }
};
