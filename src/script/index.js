import { CreateElement } from "./CreateElement.js";
import { UpdateTaskDoneTitle } from "./UpdateTaskDoneTitle.js";
import DateOnWebsite from "./DateOnWebsite.js";

const todo = (function () {
  const inputValue = document.querySelector("#input_value");
  const setInputButton = document.querySelector("#set_input_button");
  const taskDone = document.querySelector("#task-done");
  const inputError = document.querySelector("#inpurError");

  let inputResult = "";
  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  const doneTodoList = [];
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
    appendElement(elements);
    taskList.push({ id: taskId, taskName: taskContent });
    localStorage.setItem("taskList", JSON.stringify(taskList));

    elements.treshButton.addEventListener("click", () => {
      console.log("taskID", taskId);
      removeTask(elements.newLi, taskId);
    });

    elements.checkButton.addEventListener("click", () => {
      markTaskAsDone(elements.newLi, elements.checkButton);
    });
  }

  function removeTask(taskElement, taskId) {
    taskList = taskList.filter((item) => item.id !== taskId);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    taskElement.parentNode.removeChild(taskElement);
    UpdateTaskDoneTitle(doneTodoList);
  }

  function markTaskAsDone(taskElement, checkButton) {
    taskElement.classList.add("opacity-25");
    doneTodoList.push(taskElement);
    taskDone.appendChild(taskElement);
    checkButton.parentNode.removeChild(checkButton);
    UpdateTaskDoneTitle(doneTodoList);
  }

  const loadTasks = () => {
    taskList.forEach((task) => {
      const elements = addElement();
      elements.newLi.innerHTML = task.taskName;
      appendElement(elements);

      elements.treshButton.addEventListener("click", () => {
        removeTask(elements.newLi, task.id);
      });

      elements.checkButton.addEventListener("click", () => {
        markTaskAsDone(elements.newLi, elements.checkButton);
      });
    });
  };

  if (!localStorage.getItem("taskList")) {
    localStorage.setItem("taskList", JSON.stringify([]));
  }

  loadTasks();

  DateOnWebsite();
})();
