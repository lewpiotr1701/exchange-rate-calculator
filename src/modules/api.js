
import { API_KEY} from '../globals.js'

export async function getCurrencyCodes() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
    return response.json()
}
 export async function getCurrencyValue(currencyOneValue) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyOneValue}`)
    return response.json()
}


export default { getCurrencyValue, getCurrencyCodes } 