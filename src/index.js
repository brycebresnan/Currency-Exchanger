import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/ExchangeService.js';



async function exchange(e) {
  e.preventDefault();
  const usd = Number.parseFloat(getFormUsd()).toFixed(2);
  const id = getFormId();
  const rates = await ExchangeService.getRates();
  let rate = 1;

  const allIds = Object.keys(rates);
  
  if (!allIds.includes(id)) {
    printError("ERROR: The currency ID was not found.");
    return;
  } else {
    rate = Number.parseFloat(rates[id]).toFixed(2);
  }
  const changed = Number.parseFloat(usd/rate).toFixed(2);
  printResult(usd, id, rate, changed);
  
}

function printError(error) {
  console.log(error);
}

function printResult(usd, id, rate, exCurrency) {
  document.getElementById('exDisp').innerText = `You exchanged ${usd} USD at a rate of ${rate}/per ${id}. You now have ${exCurrency} ${id}`;
}


function getFormUsd() {
  const usdInput = document.getElementById('usrUsdIn').value;
  return usdInput;
}

function getFormId() {
  const idInput = document.getElementById('selectId').value;
  return idInput;
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", exchange);
});