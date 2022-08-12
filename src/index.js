import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/ExchangeService.js';



async function exchange(e) {
  e.preventDefault();
  const usd = getFormUsd();
  const id = getFormId();
  const rates = await ExchangeService.getRates();
  let rate = 1;

  const allIds = Object.keys(rates);
  
  if (!allIds.includes(id)) {
    printError("ERROR: The currency ID was not found.");
    return;
  } else {
    rate = rates[id];
  }
  const changed = usd/rate;
  printResult(changed);
  
}

function printError(error) {
  console.log(error);
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