// Fetch exchange rates and update the DOM
import { currencyOne, currencyTwo, rateInfo, amountOne, amountTwo } from '../globals.js'
import { getCurrencyValue } from './api.js';



export async function calculate() {


    const currencyOneValue = currencyOne.value;
    const currencyTwoValue = currencyTwo.value;
    try {
        const data = await getCurrencyValue(currencyOneValue)
        const ratio = data.conversion_rates[currencyTwoValue];
        rateInfo.innerText = `1 ${currencyOneValue} = ${ratio.toString()} ${currencyTwoValue}`;
        amountTwo.value = (amountOne.value * ratio).toFixed(2);
    } catch (e) {
        console.log(e)
    }


}

// Swap two currencies
export function swapCurrencies() {

    [currencyTwo.value, currencyOne.value] = [currencyOne.value, currencyTwo.value];

    calculate();

}