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
    if (!/^[a-zA-Z0-9]*$/g.test(inputValue.value)) {
      inputResult = "";
      inputValue.value = "";
      inputError.textContent = "A task can contain only letters and numbers";
    } else {
      inputError.textContent = "";
    }
    if (inputResult.trim() === "") return;

    addTask(inputResult);
    loadTask();

    inputResult = "";
    inputValue.value = "";
  });

  // Function to add a task
  function addTask(taskContent, index) {
    const taskId = Date.now()
    const elements = addElement();
    taskList.push({ id:taskId, taskName: taskContent});
    localStorage.setItem("taskList", JSON.stringify(taskList));

    elements.treshButton.addEventListener("click", () => {
      removeTask(elements.newLi, taskList.id);
    });

    elements.checkButton.addEventListener("click", () => {
      markTaskAsDone(elements.newLi, elements.checkButton);
    });
  }

  // Function to remove a task
  function removeTask(taskElement, taskContent) {
    taskList = taskList.filter((item) => item.id !== taskContent);
      localStorage.setItem("taskList", JSON.stringify(taskList));
        taskElement.parentNode.removeChild(taskElement);
        UpdateTaskDoneTitle(doneTodoList);
  }

  // Function to mark a task as done
  function markTaskAsDone(taskElement, checkButton) {
    taskElement.classList.add("opacity-25");
    doneTodoList.push(taskElement);
    taskDone.appendChild(taskElement);
    checkButton.parentNode.removeChild(checkButton);
    UpdateTaskDoneTitle(doneTodoList);
  }

  // Load tasks from localStorage
  const loadTask = () => {
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

  }

  if (!localStorage.getItem("taskList")) {
    localStorage.setItem("taskList", JSON.stringify([]));
  }

  loadTask()
  
  DateOnWebsite();
})();

// localStorage.clear()