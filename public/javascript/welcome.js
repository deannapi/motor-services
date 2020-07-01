async function addMileageHandler(event) {
  event.preventDefault();
  document.location.assign('/mileage');
};
async function addCostHandler(event) {
  event.preventDefault();
  document.location.assign('/cost');
};


document.querySelector('.add-miles').addEventListener('click', addMileageHandler);
document.querySelector('.add-cost').addEventListener('click', addCostHandler);
