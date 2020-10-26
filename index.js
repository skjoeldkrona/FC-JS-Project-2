// currency converter by skjoeldkrona

const currencies = ['EUR', 'USD', 'CHF'];
let currenciesValues = {};

function getCurrencyRates() {
  
  fetch('https://api.nbp.pl/api/exchangerates/tables/a/?format=json')
    .then(response => response.json())
    .then((response) => {
        let ratesFromApi = response[0].rates;
        ratesFromApi.forEach(item => {
          if(currencies.includes(item.code)) {
            currenciesValues[item.code] = item;
          }
        })
      })
};

function createSelect() {
  let select = document.createElement('select');
  let options = '';
    currencies.forEach(item => {
      options += `<option value="${item}">${item}</option>`;
    })

  select.innerHTML = options;
  document.getElementById('select').appendChild(select);
}

function calculate() {
  let amount = document.getElementById('amount').value;
  let currency = document.querySelector('#select select').value;
  return amount * currenciesValues[currency].mid;
}

function updateResult() {
  let result = calculate();
  document.getElementById('result').innerHTML = result.toFixed(2);
}

(function(){
    getCurrencyRates();
    createSelect();  
    document.getElementById('btnCalculate').onclick = function() {
      updateResult()
    }
}) ();