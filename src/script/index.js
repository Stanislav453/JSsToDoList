import { CreateElement } from "./CreateElement.js";
import { UpdateTaskDoneTitle } from "./UpdateTaskDoneTitle.js";

const todo = (function () {
  const inputValue = document.querySelector("#input_value");
  const setInputButton = document.querySelector("#set_input_button");
  const taskDone = document.querySelector("#task-done");
  


  let inputResult = "";
  const doneTodoList = [];
  const { addElement, appendElement } = CreateElement();

  inputValue.addEventListener("input", (e) => {
    inputResult = e.target.value;
  });

  setInputButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputResult.trim() === "") return;

    const elements = addElement();

    elements.newLi.innerHTML = inputResult;
    appendElement(elements);
    
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
})();
