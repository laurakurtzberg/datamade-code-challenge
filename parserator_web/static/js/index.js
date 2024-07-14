/* I got a lint error for this async function
   "Unexpected token function"
   but wasn't able to fix, and kept function as is */
async function getAndDisplayAddressData(inputString) {
  const url = "api/parse/?input_string=" + inputString;
  const response = await fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error(data.error);
        displayError(data.error);
      } else {
        displayResults(data);
      }
    });
}

// display error returned from the API request in the error div
function displayError(errorMessage) {
  // this pattern is from getbootstrap.com/docs/5.2/components/alerts/#triggers
  const alertPlaceholder = document.getElementById("alert-placeholder");

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-danger alert-dismissible" role="alert">`,
    `   <div>${errorMessage}</div>`,
    '   <button type="button" class="close" data-dismiss="alert" aria-label="Close">',
    '     <span aria-hidden="true">&times;</span>',
    "   </button>",
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
}

function displayResults(data) {
  // reveal the results table
  document.getElementById("address-results").style.display = "block";
  console.log(data);
  // populate the address type
  document.getElementById("parse-type").innerHTML = data.address_type;

  //clear the tbody
  const tableBody = document.querySelector("#address-results table tbody");
  tableBody.innerHTML = "";

  // populate the tbody
  for (let [part, tag] of Object.entries(data.address_components)) {
    console.log(part, tag);
    let row = document.createElement("tr");
    row.innerHTML = [`<td>${part}</td>`, `<td>${tag}</td>`].join("");
    tableBody.append(row);
  }
}

// get the address from the form
function getAddressFromForm(submitEvent) {
  // I was debating whether to use document.getElementById("address").value;
  // but I think FormData accomodates a situation where more fields might
  // be gathered in the future, or in case the id of element changes
  const formData = new FormData(submitEvent.target);
  const formProps = Object.fromEntries(formData);
  return formProps.address;
}

function resetUI() {
  // hide table in case it is there from previous request
  document.getElementById("address-results").style.display = "none";

  // hide error in case it's there
  if (document.querySelector(".alert")) {
    $(".alert-danger").alert("close");
  }
}

// I'm going to override the default submit action for the 'Parse!' button
document.getElementById("addressform").addEventListener("submit", function (e) {
  e.preventDefault();
  resetUI();

  addressString = getAddressFromForm(e);

  // Check for empty address
  if (addressString) {
    getAndDisplayAddressData(addressString);
  } else {
    displayError("Address field is empty, cannot parse");
  }
});
