import { CreateElement } from "./CreateElement.js";
import { UpdateTaskDoneTitle } from "./UpdateTaskDoneTitle.js";
import DateOnWebsite from "./DateOnWebsite.js";

const todo = (function () {
  const inputValue = document.querySelector("#input_value");
  const setInputButton = document.querySelector("#set_input_button");
  const taskDone = document.querySelector("#task-done");
  const inputError = document.querySelector("#inpurError");
  const taskManage = document.querySelector("#task-manage");

  let inputResult = "";
  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  const doneTodoList = JSON.parse(localStorage.getItem("doneTodoList")) || [];
  const { addElement, appendElement } = CreateElement();

  inputValue.addEventListener("input", (e) => {
    inputResult = e.target.value;
  });

  setInputButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9 ]*$/g.test(inputValue.value)) {
      inputResult = "";
      inputValue.value = "";
      inputError.textContent = "A task can contain only letters and numbers";
    } else {
      inputError.textContent = "";
    }
    if (inputResult.trim() === "") return;

    addTask(inputResult);

    inputResult = "";
    inputValue.value = "";
  });

  function addTask(taskContent) {
    const taskId = Date.now();
    const elements = addElement();
    elements.newLi.innerHTML = taskContent;
    appendElement(elements, taskManage);
    taskList.push({ id: taskId, taskName: taskContent });
    localStorage.setItem("taskList", JSON.stringify(taskList));

    elements.treshButton.addEventListener("click", () => {
      removeTask(elements.newLi, taskList, "taskList", taskId);
    });

    elements.checkButton.addEventListener("click", () => {
      removeTask(elements.newLi, taskList, "taskList", taskId);
      markTaskAsDone(elements.newLi, elements.checkButton);
    });
  }

  function removeTask(taskElement, arrayName, localStorageName, taskId) {
    console.log(arrayName, localStorageName, taskId);

    const filterArray = arrayName.filter((item) => item.id !== taskId);

    if (localStorageName === "taskList") {
      taskList = filterArray;
    } else if (localStorageName === "doneTodoList") {
      doneTodoList = filterArray;
    }

    localStorage.setItem(localStorageName, JSON.stringify(filterArray));

    taskElement.parentNode.removeChild(taskElement);
    UpdateTaskDoneTitle(doneTodoList);
  }

  function markTaskAsDone(taskElement, checkButton) {
    const donTtaskId = Date.now();
    taskElement.classList.add("opacity-25");

    doneTodoList.push({ id: donTtaskId, taskName: taskElement.textContent });
    localStorage.setItem("doneTodoList", JSON.stringify(doneTodoList));

    taskDone.appendChild(taskElement);
    checkButton.parentNode.removeChild(checkButton);
    UpdateTaskDoneTitle(doneTodoList);
  }

  const loadTasks = () => {
    taskList.forEach((task) => {
      const elements = addElement();
      elements.newLi.innerHTML = task.taskName;
      appendElement(elements, taskManage);

      elements.treshButton.addEventListener("click", () => {
        removeTask(elements.newLi, taskList, "taskList", task.id);
      });

      elements.checkButton.addEventListener("click", () => {
        removeTask(elements.newLi, taskList, "taskList", task.id);
        markTaskAsDone(elements.newLi, task.id, elements.checkButton);
      });
    });
  };

  if (
    !localStorage.getItem("taskList") ||
    !localStorage.getItem("doneTodoList")
  ) {
    localStorage.setItem("taskList", JSON.stringify([]));
    localStorage.setItem("doneTodoList", JSON.stringify([]));
  }

  doneTodoList.forEach((oneTask) => {
    const elements = addElement();
    elements.newLi.innerHTML = oneTask.taskName;

    appendElement(elements, taskDone);
    elements.newLi.classList.add("opacity-25");
    UpdateTaskDoneTitle(doneTodoList);

    elements.treshButton.addEventListener("click", () => {
      removeTask(elements.newLi, doneTodoList, "doneTodoList", oneTask.id);
    });
  });

  loadTasks();
  DateOnWebsite();
})();
