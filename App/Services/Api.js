// a library to wrap and simplify api calls
import apisauce from 'apisauce';

const BASE_URL = 'https://api.coindesk.com/v1/bpi/';

const ENDPOINT_PRICES = '/historical/close.json';
const ENDPOINT_CURRENT = '/currentprice.json';

const create = (baseURL = BASE_URL) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 30 second timeout...
    timeout: 30000
  })

  const getCurrentPrice = () => {
    const endpoint = `${ENDPOINT_CURRENT}`;
    return api.get(endpoint);
  }

  const getPrices = (currency = 'USD') => {
    const endpoint = `${ENDPOINT_PRICES}?index=${currency}`;
    return api.get(endpoint);
  }

  return {
    getCurrentPrice,
    getPrices
  }
}

export default {
  create
}
