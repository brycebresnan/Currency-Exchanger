import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/ExchangeService.js';



function getFormData(e) {
  e.preventDefault();
  const usdInput = document.getElementById('usrUsdIn').value;
  ExchangeService.getRates();
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", getFormData);
});