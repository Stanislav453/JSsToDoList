import { checkStyle } from "./style.js";
import { trashStyle } from "./style.js";
import { listStyle } from "./style.js";

export const CreateElement = () => {
  const taskManage = document.querySelector("#task-manage");

  const addElement = () => {
    const newLi = document.createElement("li");
    const checkButton = document.createElement("button");
    const treshButton = document.createElement("button");
    const check = document.createElement("i");
    const trash = document.createElement("i");
    const buttonContainer = document.createElement("div");

    newLi.classList.add(...listStyle);
    check.classList.add(...checkStyle);
    trash.classList.add(...trashStyle);

    return {
      newLi,
      checkButton,
      treshButton,
      check,
      trash,
      buttonContainer,
      taskManage
    };
  };

  const appendElement = (elements, perrent) => {
    perrent.appendChild(elements.newLi);
    elements.newLi.appendChild(elements.buttonContainer);
    elements.buttonContainer.appendChild(elements.checkButton);
    elements.buttonContainer.appendChild(elements.treshButton);
    elements.checkButton.appendChild(elements.check);
    elements.treshButton.appendChild(elements.trash);
  };

  return {
    addElement,
    appendElement,
  };
};
