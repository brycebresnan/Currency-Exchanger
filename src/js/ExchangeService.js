export default class ExchangeService {
  static async getRates(){
    try {
      const resp = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      const jsonResp = await resp.json();
      if (!resp.ok) {
        let errorMsg = `There was an error accessing exchange rate data from API: ${resp.status} ${resp.statusText} ${jsonResp.message}`;
        throw new Error(errorMsg);
      }
      let rates = jsonResp.conversion_rates;
      return rates;
    } catch(error) {
      return error;
    }
  }
}