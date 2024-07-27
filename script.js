const apiURL =
  "https://v6.exchangerate-api.com/v6/1804e433e069c41ed3e1091e/latest/USD";
let exchangeRates = {};
let currencies = [];

// Fetch exchange rates from the API using async/await and try/catch
async function fetchExchangeRates() {
  try {
    const response = await fetch(apiURL); // Send a GET request to the API URL
    const data = await response.json(); // Parse the response as JSON
    exchangeRates = data.conversion_rates; // Store the exchange rates in the exchangeRates object
    currencies = Object.keys(exchangeRates); // Get the list of currencies from the exchangeRates object
    populateCurrencySelectors(); // Populate the currency selectors in the HTML
  } catch (error) {
    console.error("Error fetching exchange rates:", error); // Log any errors that occur during the fetch
  }
}

function populateCurrencySelectors() {
  const fromCurrencySelect = document.getElementById("fromCurrency"); // Get the "from" currency selector element
  const toCurrencySelect = document.getElementById("toCurrency"); // Get the "to" currency selector element

  // Use DocumentFragment to minimize reflows and repaints
  const fromFragment = document.createDocumentFragment(); // Create a document fragment for the "from" currency options
  const toFragment = document.createDocumentFragment(); // Create a document fragment for the "to" currency options

  currencies.forEach((currency) => {
    const optionFrom = document.createElement("option"); // Create an option element for the "from" currency
    optionFrom.value = currency; // Set the value of the option to the currency code
    optionFrom.textContent = currency; // Set the text content of the option to the currency code
    fromFragment.appendChild(optionFrom); // Append the option to the "from" fragment

    const optionTo = document.createElement("option"); // Create an option element for the "to" currency
    optionTo.value = currency; // Set the value of the option to the currency code
    optionTo.textContent = currency; // Set the text content of the option to the currency code
    toFragment.appendChild(optionTo); // Append the option to the "to" fragment
  });

  fromCurrencySelect.appendChild(fromFragment); // Append the "from" fragment to the "from" currency selector
  toCurrencySelect.appendChild(toFragment); // Append the "to" fragment to the "to" currency selector
}

document.getElementById("convertBtn").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("amount").value); // Get the amount value entered by the user and parse it as a float
  const fromCurrency = document.getElementById("fromCurrency").value; // Get the selected "from" currency value
  const toCurrency = document.getElementById("toCurrency").value; // Get the selected "to" currency value

  if (!isNaN(amount)) {
    // Check if the amount is a valid number
    const convertedAmount =
      (amount * exchangeRates[toCurrency]) / exchangeRates[fromCurrency]; // Calculate the converted amount using the exchange rates
    document.getElementById(
      "result"
    ).textContent = `  = ${convertedAmount.toFixed(2)} `; // Display the converted amount in the result element
  } else {
    document.getElementById("result").textContent =
      "Please enter a valid amount."; // Display an error message if the entered amount is not a valid number
  }
});

// Call the function to fetch exchange rates when the script loads
fetchExchangeRates();
