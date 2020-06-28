// document.querySelector('#add-cost').addEventListener('submit', addMileageFormHandler);

const addCost = document.querySelector('.add-cost');

if (addCost) {
    addCost.addEventListener('click', function(event) {
        event.preventDefault();
        document.location.replace('/logbook');
    });
};
