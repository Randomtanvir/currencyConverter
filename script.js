const fromAmountElement = document.querySelector('.amount');
const converterAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.formCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resustElement = document.querySelector('.resust');
const converterContainer = document.querySelector('.converter-container');

// *Array to populate the select tags with these countries 

const countries = [
    {code : "USD", name : "United states Dollar"},
    {code : "KRW", name : "South Korean Won"},
    {code : "MXN", name : "Mexicoan Peso"},
    {code : "MYR", name : "Malaysian Ringgit"},
    {code : "NOK", name : "Nowrwegian krone"},
    {code : "INR", name : "Indian Ruppe"},
    {code : "NZD", name : "New Zealand Dollar"},
    {code : "PEN", name : "Peruvian sol"},
    {code : "PHP", name : "Philippine peso"},
    {code : "PLN", name : "Polish Zioty"},
    {code : "RUB", name : "Russian Ruble"}
];

// *Showing countries form array to select tag

countries.forEach(country=>{
    const optionOne = document.createElement('option');
    const optionTwo = document.createElement('option');
    optionOne.value = optionTwo.value = country.code;
    optionOne.textContent = optionTwo.textContent = `${country.code} (${country.name})`;
    fromCurrencyElement.appendChild(optionOne);
    toCurrencyElement.appendChild(optionTwo);

    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "KRW";

});

// * Function to get exchange rate using API

const getExchangeRates = async ()=>{
    const amount = parseFloat(fromAmountElement.value);
    const formCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resustElement.textContent = "Fetching Exchange Rates..."

    try {
        //! Fetch Data from API
    const response = await fetch(`https://v6.exchangerate-api.com/v6/6d333d88e56a3de88a901867/latest/${formCurrency}`);
    const data = await response.json();
   
    const convarsionRate = data.conversion_rates[toCurrency];
    const convarsionAmount = (amount * convarsionRate).toFixed(2);
    if (typeof convarsionRate === 'undefined') {
        resustElement.textContent = "not found"
        converterAmountElement = "";
    }else{

        converterAmountElement.value= convarsionAmount;
        resustElement.textContent = `${amount} ${formCurrency} = ${convarsionAmount} ${toCurrency}`
    }

    } catch (e) {
        converterContainer.innerHTML = `<h1> Errors !</h1>`
    }

    
if (fromAmountElement.value === '') {
    resustElement.textContent = "Fetching Exchange Rates..."
}
  

}

fromAmountElement.addEventListener('input',getExchangeRates);
fromCurrencyElement.addEventListener('change',getExchangeRates);
toCurrencyElement.addEventListener('change',getExchangeRates);
window.addEventListener('load',getExchangeRates);