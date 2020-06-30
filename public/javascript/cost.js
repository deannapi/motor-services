async function addMaintenanceFormHandler(event) {
  event.preventDefault();

  const date = document.querySelector('input[name="date_cost"]').value;
  const description = document.querySelector('input[name="maintenance"]').value;
  const price = document.querySelector('input[name="price"]').value;

  const response = await fetch(`/api/cost`, {
    method: "POST",
    body: JSON.stringify({
      date,
      description,
      price,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/cost");
  } else {
    alert(response.statusText);
  }
}

// "Add a maintenance entry" button sends to cost page
const addMaint = document.querySelector(".add-cost");

if (addMaint) {
    addMaint.addEventListener("click", function (event) {
    event.preventDefault();
    document.location.replace("/cost");
  });
}
