export const currencyFetch = async (currencyValueDate = '', currency = 'EUR') => {
    const currencyFormatted = currency.toLowerCase();
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const API_URL = `${PROXY_URL}http://api.nbp.pl/api/exchangerates/rates/a/${currencyFormatted}/${currencyValueDate}/?format=json`;

    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}