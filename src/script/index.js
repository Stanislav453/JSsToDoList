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
  const todoListTask = [];
  const doneTodoList = [];
  const { addElement, appendElement } = CreateElement();

  inputValue.addEventListener("input", (e) => {
    inputResult = e.target.value;
  });

  setInputButton.addEventListener("click", (e) => {
    e.preventDefault();
    const elements = addElement();
    if (!/^[a-zA-Z0-9]*$/g.test(inputValue.value)) {
      inputResult = "";
      inputValue.value = "";
      inputError.textContent = "A task can contain only letters and numbers";
    } else {
      inputError.textContent = "";
      // localStorage.setItem("taskList", JSON.stringify(todoListTask));
    }
    if (inputResult.trim() === "") return;

    elements.newLi.innerHTML = inputResult;
    appendElement(elements);
    taskList.push(elements.newLi.outerHTML);
    localStorage.setItem("taskList", JSON.stringify(taskList));

    elements.treshButton.addEventListener("click", () => {
      const index = doneTodoList.indexOf(elements.newLi);
      if (index !== -1) {
        doneTodoList.splice(index, 1);
      }
      elements.newLi.parentNode.removeChild(elements.newLi);
      UpdateTaskDoneTitle(doneTodoList);
    });

    elements.checkButton.addEventListener("click", () => {
      elements.newLi.classList.add("opacity-25");
      doneTodoList.push(elements.newLi);

      doneTodoList.map((oneTask, index) => {
        taskDone.appendChild(oneTask);
      });
      elements.checkButton.parentNode.removeChild(elements.checkButton);

      UpdateTaskDoneTitle(doneTodoList);
    });

    inputResult = "";
    inputValue.value = "";
  });
  taskList.map((item, key) => {
    const elements = addElement();
    elements.newLi.innerHTML = item;
    return appendElement(elements);
  });

  if (!localStorage.getItem("taskList")) {
    localStorage.setItem("taskList", JSON.stringify([]));
  }

  DateOnWebsite();
})();
