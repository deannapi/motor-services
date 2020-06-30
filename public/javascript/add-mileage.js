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
    document.location.replace("/mileage");
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
  var convOil = 7500;

    //   Conventional Oil
  const td3 = document.createElement("td");
  if (mileage < convOil) {
    answer1 = convOil - mileage;
    td3.innerText = answer1 + " more miles to go";
    row.appendChild(td3);
  } else if (mileage > convOil) {
    // color code RED if over 3000
    td3.innerText = "Change Oil!";
  }

    //   Synthetic Oil
  const td4 = document.createElement("td");
  if (mileage < synOil) {
      answer2 = synOil - mileage;
      td4.innerText = answer2 + " more miles to go";
      row.appendChild(td4);
  } else if (mileage > synOil) {
      td4.innerText = "Change Oil!";
  }

    // Brake Pads
    const td5 = document.createElement("td");
    if (mileage < brakes) {
        answer3 = brakes - mileage;
        td5.innerText = answer3 + " more miles to go";
        row.appendChild(td5);
    } else if (mileage > brakes) {
        td5.innerText = "Change Brake Pads!";
    }

    // Tires
    const td6 = document.createElement("td");
    if (mileage < tires) {
        answer4 = tires - mileage;
        td6.innerText = answer4 + " more miles to go";
        row.appendChild(td6);
    } else if (mileage > tires) {
        td6.innerText = "Change Tires!";
    }

    // Air Filter
    const td7 = document.createElement("td");
    if (mileage < filter) {
        answer5 = filter - mileage;
        td7.innerText = answer5 + " more miles to go";
        row.appendChild(td7);
    } else if (mileage > filter) {
        td7.innerText = "Change Filter!";
    }
});
