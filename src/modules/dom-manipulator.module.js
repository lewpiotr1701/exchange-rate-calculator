import { currencyOne, currencyTwo, amountOne, amountTwo, swapButton } from '../globals.js'
import { getCurrencyCodes } from './api.js';
import { calculate, swapCurrencies } from './currency.module.js'

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

swapButton.addEventListener("click", swapCurrencies)



export function addOptionsToSelect(currencyCodes, targetNode) {

    const fragment = document.createDocumentFragment();

    currencyCodes.forEach(code => {
        const option = document.createElement("option");
        option.value = code[0];
        option.textContent = code[0];
        fragment.appendChild(option);
    })
    targetNode.appendChild(fragment)
}

// Populate select with options
export async function populateOptions() {
    try {
        const data = await getCurrencyCodes()

        const supportedCodes = data.supported_codes;

        addOptionsToSelect(supportedCodes, currencyOne);
        addOptionsToSelect(supportedCodes, currencyTwo);

        calculate();

    } catch (e) {
        console.log(e)
    }

}