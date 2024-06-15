const DateOnWebsite = () => {
  const time = document.querySelector("#time");

  const newCurentDay = new Date().toLocaleDateString();
  
  time.innerHTML = newCurentDay;
};

export default DateOnWebsite;
