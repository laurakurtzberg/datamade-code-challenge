/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
// TODO: should I leave a default value on the inputString?
async function getData(inputString) {
    const url = "api/parse/?input_string=" + inputString;
    const response = await fetch(url, {
       method: "GET",
     })
     .then(response => response.json())
     .then(data => {
       console.log(data);
     });
 }

 // a function to check if the address is not empty
 function addressIsNotEmpty(address) {
   if (!addressString) {
     console.error('Address field is empty, cannot parse');
     return false;
   } else {
     return true;
   }
 }

 // display the error message to the UI if address is empty
 function displayEmptyError() {
   // TODO: add function body
 }

// I'm going to override the default submit action for the 'Parse!' button
 document.getElementById("addressform").addEventListener("submit", function (e) {
   e.preventDefault();

   // I was debating whether to use document.getElementById("address").value;
   // but I think FormData accomodates a situation where more fields might
   // be gathered in the future, or in case the id of element changes
   const formData = new FormData(e.target);
   const formProps = Object.fromEntries(formData);
   const addressString = formProps.address;

   // check for empty address
   if addressIsNotEmpty(addressString) {
     getData();
   } else {
     displayEmptyError();
   }
 });

//getData();
// replace spaces with %20 in url request with fetch
// for example: .../api/parse/?input_string='123%20n%20mai'
