import { CreateElement } from "./CreateElement.js";

const todo = (function () {
  const inputValue = document.querySelector("#input_value");
  const setInputButton = document.querySelector("#set_input_button");

  let inputResult = "";
  const todoList = [];
  const { addElement, appendElement } = CreateElement();

  inputValue.addEventListener("input", (e) => {
    inputResult = e.target.value;
  });

  setInputButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputResult.trim() === "") return;

    // todoList.push(inputResult);
    const elements = addElement();
    elements.newLi.innerHTML = inputResult;
    appendElement(elements);

    inputResult = "";
    inputValue.value = "";
  });
})();