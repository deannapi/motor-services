async function post(mileageData) {
  const response = await fetch(`/api/maintenance`, {
    method: "POST",
    body: JSON.stringify(mileageData),
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

async function getAll() {
  const response = await fetch('/api/maintenance', {
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

async function destroy(mileageData) {
  const response = await fetch(`/api/maintenance/delete`, {
    method: "DELETE",
    body: JSON.stringify(mileageData),
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

// Add in a way to pull user information to determine their type of oil and only display that type

// Still need to make it delete from the database
async function deleteRow(row_id) {
  const date = document.querySelector("#mile_book").rows[row_id].cells[0].textContent;
  const mileage = document.querySelector("#mile_book").rows[row_id].cells[1].textContent;
  console.log(date);
  console.log(mileage);
  await destroy({ date, mileage })
  // document.querySelector("#mile_book").deleteRow(row_id);
  location.reload();
};

async function renderTable() {
  const data = await getAll();
  let index = 1;

  for (const i of data) {
    //   Add date and mileage
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = i.date;
    row.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = i.mileage;
    row.appendChild(td2);

    document.getElementById("mile_book").appendChild(row);

    // calculations for repair columns
    var synOil = 7500;
    var brakes = 50000;
    var tires = 45000;
    var filter = 25000;
    var convOil = 5000;

    //   Conventional Oil
    const td3 = document.createElement("td");
    // Changed from if (i.mileage <= convOil)
    if ((i.mileage < 300) || (i.mileage % convOil) > 300) {
      answer1 = convOil - (i.mileage % convOil);
      td3.innerText = answer1 + " more miles to go";

    } else {
      // color code RED if over 3000
      td3.innerText = "Change Oil!";
    }
    row.appendChild(td3);
    //   Synthetic Oil
    const td4 = document.createElement("td");
    if ((i.mileage < 300) || (i.mileage % synOil) > 300) {
      answer2 = synOil - (i.mileage % synOil);
      td4.innerText = answer2 + " more miles to go";

    } else {
      td4.innerText = "Change Oil!";
    }
    row.appendChild(td4);
    // Brake Pads
    const td5 = document.createElement("td");
    if ((i.mileage < 300) || (i.mileage % brakes) > 300) {
      answer3 = brakes - (i.mileage % brakes);
      td5.innerText = answer3 + " more miles to go";

    } else {
      td5.innerText = "Change Brake Pads!";
    }
    row.appendChild(td5);

    // Tires
    const td6 = document.createElement("td");
    if ((i.mileage < 300) || (i.mileage % tires) > 300) {
      answer4 = tires - (i.mileage % tires);
      td6.innerText = answer4 + " more miles to go";

    } else {
      td6.innerText = "Change Tires!";
    } row.appendChild(td6);

    // Air Filter
    const td7 = document.createElement("td");
    if ((i.mileage < 300) || (i.mileage % filter) > 300) {
      answer5 = filter - (i.mileage % filter);
      td7.innerText = answer5 + " more miles to go";
      ;
    } else {
      td7.innerText = "Change Filter!";
    } row.appendChild(td7)

    // Delete the entire row
    const td8 = document.createElement("td");
    td8.innerHTML = `<button id="btn-${index}" class="btn btn-outline-secondary" onclick="deleteRow(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button>`;
    row.appendChild(td8);
  }
  //   on submit, clear input fields
  document.getElementById("miles_form").reset();
  index++;
}

document.getElementById("add-mileage")
  .addEventListener('click', async () => {
    // get form data
    const date = document.getElementById("date_miles").value;
    const mileage = parseInt(document.getElementById("miles").value);
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    console.log(user_id)
    // post to api with the form data
    await post({ date, mileage, user_id });
  });

document.addEventListener("DOMContentLoaded", renderTable);
