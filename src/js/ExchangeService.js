export default class ExchangeService {
  static async getRates(){
    try {
      const resp = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      const jsonResp = await resp.json();
      console.log(jsonResp);
    } catch(error) {
      return;
    }
  }
}