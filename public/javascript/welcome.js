

async function addMileageHandler(event) {
    event.preventDefault();

    const response = await fetch(`/api/maintenance`, {
        method: "POST",
        body: JSON.stringify({
          date,
          mileage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

        if (response.ok) {
            document.location.replace('/add-mileage');
        } else (response.statusText);
    }

async function addCostHandler(event) {
    event.preventDefault();


}


document.querySelector('.add-miles').addEventListener('submit', addMileageHandler);
document.querySelector('.add-cost').addEventListener('submit', addCostHandler);
