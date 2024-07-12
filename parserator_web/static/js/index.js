/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
// TODO: should I leave a default value on the inputString?
async function getData(inputString='123%20main%20st%20chicago%20il') {
    const url = "api/parse/?input_string=" + inputString;
    const response = await fetch(url, {
       method: "GET",
     })
     .then(response => response.json())
     .then(data => {
       console.log(data);
     });
 }

// I'm going to override the default submit action for the 'Parse!' button
 document.getElementById("submit").addEventListener("submit", function (e) {
   e.preventDefault();
 }

getData();
// replace spaces with %20 in url request with fetch
// for example: .../api/parse/?input_string='123%20n%20mai'
