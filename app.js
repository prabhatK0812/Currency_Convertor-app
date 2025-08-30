// base url of API to fetch currency exchanges :
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

// for selcting all button/dropdown ::

// Selects all <select> elements (currency dropdowns).
const dropdowns = document.querySelectorAll("select");
// Selects the button with class btn (the "Convert" button).
const btn = document.querySelector("button.btn"); 
// Selects the "From Currency" dropdown inside .select-box.
const fromCurr = document.querySelector(".select-box select[name='from']");
// Selects the "To Currency" dropdown inside .select-box.
const toCurr = document.querySelector(".select-box select[name='to']");
// Selects the element with id msg (where conversion results are shown).
const msg = document.querySelector("#msg");
// Selects the element with id themeToggle (for dark/light mode switch).
const themeToggle = document.querySelector("#themeToggle");

// Populate dropdowns :
for (let select of dropdowns) {  // Loops over every dropdown.
  for (let currCode in countryList) { // Loops through every currency code in countryList object.
    let newOption = document.createElement("option"); // Creates a new <option> element.
    // Sets option text and value to the currency code (e.g., "USD").
    newOption.innerText = currCode; 
    newOption.value = currCode;

    // Sets default selections:
    // From Currency = USD
    // To Currency = INR
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption); // Adds the option to the dropdown.
  }

  // Whenever the dropdown changes, updateFlag() runs to update the flag image.
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Flag update function :
const updateFlag = (element) => {  // Defines a function to change the flag image.
  let currCode = element.value; // Gets the selected currency code (e.g., "USD").
  let countryCode = countryList[currCode]; // Gets the country code from countryList (e.g., USD → US).
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;  // Builds the flag image URL.
  let img = element.parentElement.querySelector("img"); // Finds the <img> inside the dropdown’s parent container.
  img.src = newSrc; // Updates the image to the new flag.
};

// Fetch & Convert
btn.addEventListener("click", async (evt) => { // Runs when the button is clicked.
  evt.preventDefault(); // Prevents form reload/page refresh.

  // Gets the amount entered by the user.
  let amount = document.querySelector("#amount");
  let amtVal = amount.value;

  // If the amount is empty or less than 1, set it to 1.
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  
  // Creates the API URL (e.g., for USD → /usd.json).
  const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
  // Fetches the data from the API and converts it to JSON.
  let response = await fetch(URL);
  let data = await response.json();
  
  // Gets the conversion rate from source to target (e.g., usd → inr).
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  if (!rate) { // If the rate isn’t found, show an error message.
    msg.innerText = "❌ Conversion not available!";
    return;
  }
  
  let finalAmount = (amtVal * rate).toFixed(2); // Calculates the converted amount (rounded to 2 decimals).
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; // Displays the result in the msg element.
});

// Dark/Light Mode Toggle :
themeToggle.addEventListener("click", () => { // Runs when the theme toggle button is clicked
  document.body.classList.toggle("dark"); // Adds/removes the dark class on <body> to switch themes.

  // If dark mode is on → show ☀️ (sun icon).
  if (document.body.classList.contains("dark")) {  
    themeToggle.textContent = "☀️";
  } 
  // If light mode is on → show 🌙 (moon icon).
  else {  
    themeToggle.textContent = "🌙";
  }
});


// THIS IS THE STEP_WISE WORKING FLOW CHART FOR THIS PROJECT ::

// Step 1 – Setup
// The page loads.
// The dropdowns are filled with all currencies (USD, INR, EUR, etc.).
// By default:
// From Currency = USD
// To Currency = INR
// Flags for USA 🇺🇸 and India 🇮🇳 are shown.

// Step 2 – User Input
// You type 100 into the #amount input box.
// The page now has:
// fromCurr.value = "USD"
// toCurr.value = "INR"
// amount.value = "100"

// Step 3 – Button Click
// When you click Convert:
// btn.addEventListener("click", async (evt) => {
// This function runs.

// Step 4 – Amount Check
// let amount = document.querySelector("#amount");
// let amtVal = amount.value;


// amtVal = "100".

// if (amtVal === "" || amtVal < 1) {
//   amtVal = 1;
//   amount.value = "1";
// }


// Not empty, greater than 1 → keeps 100.

// Step 5 – Build API URL
// const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
// fromCurr.value = "USD".
// URL becomes:
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json

// Step 6 – Fetch Data
// let response = await fetch(URL);
// let data = await response.json();
// Fetches the JSON file for USD.
// Inside data is something like:
// {
//   "usd": {
//     "inr": 83.25,
//     "eur": 0.92,
//     "gbp": 0.78,
//     ...
//   }
// }

// Step 7 – Get Conversion Rate
// let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
// Looks at data["usd"]["inr"].
// Suppose the API says: 1 USD = 83.25 INR.
// So, rate = 83.25.

// Step 8 – Calculate Final Amount
// let finalAmount = (amtVal * rate).toFixed(2);
// amtVal = 100
// rate = 83.25
// 100 * 83.25 = 8325
// toFixed(2) → "8325.00"

// Step 9 – Show Message
// msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

// Becomes:
// 100 USD = 8325.00 INR
// This appears inside the #msg element on the page.

// Step 10 – Theme Toggle (Optional)
// If you click the theme button:
// It adds/removes the "dark" class on <body>.
// The icon switches between 🌙 and ☀️.

// Final User Experience:

// You enter 100 USD, press Convert, and see:
// “100 USD = 8325.00 INR”
// Plus, the flags of 🇺🇸 and 🇮🇳 are shown next to dropdowns.

// FLOW CHART :
// Input amount → Select currencies → Click button → Build API URL → Fetch data → Extract rate → Calculate → Show result.