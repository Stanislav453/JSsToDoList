import { CreateElement } from "./CreateElement.js";

const TaskProperties = () => {

  const { addElement, appendElement } = CreateElement();
  
  const setTask = (inputResult) => {
    const elements = addElement();
    elements.newLi.innerHTML = inputResult;
    appendElement(elements);
  };

  const removeTask = (doneTodoList) => {
        const elements = addElement();

    const index = doneTodoList.indexOf(elements.newLi);
    if (index !== -1) {
      doneTodoList.splice(index, 1);
    }
    elements.newLi.parentNode.removeChild(elements.newLi);
  };

  return {
    setTask,
    removeTask
  };
};

export default TaskProperties
