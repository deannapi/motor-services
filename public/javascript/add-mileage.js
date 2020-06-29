async function addMileageFormHandler(event) {
  event.preventDefault();

  const date = document.querySelector('input[name="date_miles"]').value;
  const mileage = document.querySelector('input[name="mileage"]').value;

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
    document.location.replace("/logbook");
  } else {
    alert(response.statusText);
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

// insert selected date and mileage into table
var mileSubmit = document.getElementById("add-mileage");

mileSubmit.addEventListener("click", function () {
  const date = document.getElementById("date_miles").value;
  const mileage = document.getElementById("miles").value;
  console.log(date, mileage);
  const row = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.innerText = date;
  row.appendChild(td1);

  const td2 = document.createElement("td");
  td2.innerText = mileage;
  row.appendChild(td2);

  document.getElementById("mile_book").appendChild(row);
  //   NEED TO ADD LOCAL STORAGE HERE - data deletes on refresh

  // calculations for repair columns
  var synOil = 3000;
  var brakes = 50000;
  var tires = 45000;
  var filter = 300000;

  function conventional() {
    const mileage = document.getElementById("miles").value;
    var convOil = 7500;
    const row = document.createElement("tr");
    const td1 = document.createElement("td[3]");
    if (mileage < convOil) {
      answer = convOil - mileage;
      td1.innerText = answer + "more miles to go.";
      row.appendChild(td1);
    console.log(answer + " more miles to go.");
    } else if (mileage > convOil) {
      // color code RED if over 3000
    }
  }

  conventional();

  function synthetic(mileage) {

  }
});
