async function addMileageFormHandler(event) {
    event.preventDefault();

    const date = document.querySelector('input[name="date"]').value;
    const mileage = document.querySelector('input[name="mileage"]').value;

    const response = await fetch(`/api/maintenance`, {
        method: 'POST',
        body: JSON.stringify({
            date,
            mileage
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/logbook');
    } else {
        alert(response.statusText);
    }
}

// document.querySelector('#add-mileage').addEventListener('submit', addMileageFormHandler);


// Add mileage button sends to mileage page
const addMiles = document.querySelector('.add-miles');

if (addMiles) {
    addMiles.addEventListener('click', function(event) {
        event.preventDefault();
        document.location.replace('/mileage')
    });
};
