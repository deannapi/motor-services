async function post(mileageData) {
  debugger;
  const response = await fetch(`/api/maintenance`, {
    method: "POST",
    body: mileageData,
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

// "Add mileage" button sends to mileage page
const addMiles = document.querySelector(".add-miles");

if (addMiles) {
  addMiles.addEventListener("click", function (event) {
    event.preventDefault();
    document.location.replace("/mileage");
  });
}

// get input text with submit button
var data = JSON.parse(localStorage.getItem("Mileage Logbook")) || {};

// insert selected date and mileage into table
var mileSubmit = document.getElementById("add-mileage");

async function renderTable() {
  const data = await getAll();

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
    //   NEED TO ADD LOCAL STORAGE HERE - data deletes on refresh

    // calculations for repair columns
    var synOil = 3000;
    var brakes = 50000;
    var tires = 45000;
    var filter = 300000;
    var convOil = 7500;

    //   Conventional Oil
    const td3 = document.createElement("td");
    if (i.mileage <= convOil) {
      answer1 = convOil - i.mileage;
      td3.innerText = answer1 + " more miles to go";

    } else {
      // color code RED if over 3000
      td3.innerText = "Change Oil!";
    }
    row.appendChild(td3);
    //   Synthetic Oil
    const td4 = document.createElement("td");
    if (i.mileage <= synOil) {
      answer2 = synOil - i.mileage;
      td4.innerText = answer2 + " more miles to go";

    } else {
      td4.innerText = "Change Oil!";
    }
    row.appendChild(td4);
    // Brake Pads
    const td5 = document.createElement("td");
    if (i.mileage <= brakes) {
      answer3 = brakes - i.mileage;
      td5.innerText = answer3 + " more miles to go";

    } else {
      td5.innerText = "Change Brake Pads!";
    }
    row.appendChild(td5);

    // Tires
    const td6 = document.createElement("td");
    if (i.mileage <= tires) {
      answer4 = tires - i.mileage;
      td6.innerText = answer4 + " more miles to go";

    } else {
      td6.innerText = "Change Tires!";
    } row.appendChild(td6);

    // Air Filter
    const td7 = document.createElement("td");
    if (i.mileage <= filter) {
      answer5 = filter - i.mileage;
      td7.innerText = answer5 + " more miles to go";
      ;
    } else {
      td7.innerText = "Change Filter!";
    } row.appendChild(td7)
  }
  //   on submit, clear input fields
  document.getElementById("miles_form").reset();
}

mileSubmit.addEventListener('submit', (e) => {
  e.preventDefault();

  // get form data
  const date = document.getElementById("date_miles").value;
  const mileage = document.getElementById("miles").value;

  // post to api with the form data
  post({ date, mileage });
});

document.addEventListener("DOMContentLoaded", renderTable);