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

// submit button renders date, description and cost to table
var maintSubmit = document.getElementById("add-maintenance");

maintSubmit.addEventListener("click", function() {
    const date = document.getElementById("date").value;
    const description = document.getElementById("maintenance").value;
    const price = document.getElementById("price").value;

    console.log(date, description, price);

    // add date, desc and price to table
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = date;
    row.appendChild(td1);

    const td2 = document.createElement('td');
    td2.innerText = description;
    row.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerText = price;
    row.appendChild(td3);

    document.getElementById("costbook").appendChild(row);

    // on submit clear input fields
    document.getElementById("maintenance").reset();
});