import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/ExchangeService.js';

async function exchange(e) {
  e.preventDefault();

  const usd = Number.parseFloat(getFormUsd()).toFixed(2);
  const id = getFormId();
  let rate;
  const rates = await ExchangeService.getRates();

  if (typeof rates.USD !== "undefined") {
    const allIds = Object.keys(rates);
    if (!allIds.includes(id)) {
      printError("ERROR: The currency ID was not found.");
      return;
    } else {
      rate = Number.parseFloat(rates[id]).toFixed(2);
    }
    const exchanged = Number.parseFloat(usd*rate).toFixed(2);
    printResult(usd, id, rate, exchanged);
  } else {
    printError(rates);
  }
}

async function createDropList(){
  let rates = await ExchangeService.getRates();

  if (typeof rates.USD !== "undefined") {
    let ratesArray = Object.keys(rates);
    
    const select = document.createElement("select");
    select.name = "selId";
    select.id = "selId";

    ratesArray.forEach(function(rate){
      const option = document.createElement("option");
      option.value = rate;
      option.text = rate;
      select.appendChild(option);
    });

    const label = document.createElement("label");
    label.innerHTML = "Select exchange currency: ";
    label.htmlFor = "selId";

    document.getElementById("dynamicList").appendChild(label).appendChild(select);
  } else {
    printError(rates);
  }
  
}

function printError(error) {
  document.getElementById('exDisp').innerText = `Oops! Something went wrong: ${error}`;
}

function printResult(usd, id, rate, exCurrency) {
  document.getElementById('exDisp').innerText = `You exchanged ${usd} USD at a rate of ${rate}/per ${id}. You now have ${exCurrency} ${id}`;
}


function getFormUsd() {
  const usdInput = document.getElementById('usrUsdIn').value;
  return usdInput;
}

function getFormId() {
  const idInput = document.getElementById('selId').value;
  return idInput;
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", exchange);
  createDropList();
});