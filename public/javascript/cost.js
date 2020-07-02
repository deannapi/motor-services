"use strict";
async function post(costData) {
  const response = await fetch(`/api/cost`, {
    method: "POST",
    body: JSON.stringify(costData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    renderTable();
  } else {
    alert(response.statusText);
  }
}

async function getAll() {
  const response = await fetch('/api/cost', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.log(response.statusText);
  }
}

async function destroy(data) {
  const response = await fetch(`/api/cost`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    renderTable();
  } else {
    console.log(response.statusText);
  }
}

// Delete button functionality
async function deleteRow(row_id) {
  const date = document.querySelector("#costbook").rows[row_id].cells[0].textContent;
  const description = document.querySelector("#costbook").rows[row_id].cells[1].textContent;
  console.log(date);
  console.log(description);
  await destroy({ date, description });
  // document.querySelector("#mile_book").deleteRow(row_id);
  location.reload();
};

async function renderTable() {
  const data = await getAll();
  let index = 1;
  for (const i of data) {


    // add date, desc and price to table
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = i.date;
    row.appendChild(td1);

    const td2 = document.createElement('td');
    td2.innerText = i.description;
    row.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerText = i.price;
    row.appendChild(td3);

    const td8 = document.createElement("td");
    td8.innerHTML = `<button id="cost-btn-${index}" class="btn btn-outline-secondary" onclick="deleteRow(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button>`;
    row.appendChild(td8);

    document.getElementById("costbook").appendChild(row);
    index++;
  }
  // on submit clear input fields
  document.getElementById("maintenance").reset();
}

document.getElementById("add-maintenance")
  .addEventListener('click', async () => {
    // get form data
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    // post to api with the form data
    await post({ date, description, price });
  });

document.addEventListener("DOMContentLoaded", renderTable);