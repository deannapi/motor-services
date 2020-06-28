const { response } = require("express");

async function addMileageHandler(event) {
    event.preventDefault();

        if (response.ok) {
            document.location.replace('/add-mileage');
        } else (response.statusText);
    })
}

async function addCostHandler(event) {
    event.preventDefault();


}


document.querySelector('.add-miles').addEventListener('submit', addMileageHandler);
document.querySelector('.add-cost').addEventListener('submit', addCostHandler);
