// @ts-nocheck
const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const amountOne = document.querySelector("#amount-one");
const amountTwo = document.querySelector("#amount-two");
const swapButton = document.querySelector("#swap");
const rateInfo = document.querySelector("#rate");

// Event listeners
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);

amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", (calculate));

swapButton.addEventListener("click", swapCurrencies)

populateOptions();
calculate();


// Populate select with options
function populateOptions() {

    const API_KEY = "f8a6e778f521e80470d9d262";

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return res.json()
        })
        .then(data => {
            const supportedCodes = data.supported_codes;

            const fragment = document.createDocumentFragment();

            supportedCodes.forEach(code => {
                const option = document.createElement("option");
                option.value = code[0];
                option.textContent = code[0];
                fragment.appendChild(option);
            })

            currencyOne.appendChild(fragment);
            currencyTwo.appendChild(fragment);

        })
        .catch(err => {
            console.log("Could not get data", err)
        })

}

// Fetch exchange rates and update the DOM
function calculate() {

    const API_KEY = "f8a6e778f521e80470d9d262";

    const currencyOneValue = currencyOne.value;
    const currencyTwoValue = currencyTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyOneValue}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return res.json()
        })
        .then(data => {
            const ratio = data.conversion_rates[currencyTwoValue];
            rateInfo.innerText = `1 ${currencyOneValue} = ${ratio.toString()} ${currencyTwoValue}`;
            amountTwo.value = (amountOne.value * ratio).toFixed(2);
        })
        .catch(err => {
            console.log("Could not get data", err)
        })

}

// Swap two currencies
function swapCurrencies() {

    [currencyTwo.value, currencyOne.value] = [currencyOne.value, currencyTwo.value];

    calculate();

}