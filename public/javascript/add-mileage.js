async function addMileageFormHandler(event) {
    event.preventDefault();

    const date = document.querySelector('input[name="date"]').value;
    const mileage = document.querySelector('input[name="mileage"]').value;


}

document.querySelector('.logbook').addEventListener('submit', addMileageFormHandler);