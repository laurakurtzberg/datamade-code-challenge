/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
// TODO: should I leave a default value on the inputString?
async function getAddressData(inputString) {
    const url = "api/parse/?input_string=" + inputString;
    const response = await fetch(url, {
       method: "GET",
     })
     .then(response => response.json())
     .then(data => {
       console.log(data);
     });
 }

 // display the error message to the UI if address is empty
 function displayEmptyError() {
   // TODO: add function body
   console.error('Address field is empty, cannot parse');
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

// I'm going to override the default submit action for the 'Parse!' button
 document.getElementById("addressform").addEventListener("submit", function (e) {
   e.preventDefault();

   addressString = getAddressFromForm(e);

   // check for empty address
   if (addressString) {
     getAddressData(addressString);
   } else {
     displayEmptyError();
   }
 });

//getData();
// replace spaces with %20 in url request with fetch
// for example: .../api/parse/?input_string='123%20n%20mai'
