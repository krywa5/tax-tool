export const currencyFetch = async (currencyValueDate = '', currency = 'EUR') => {
    const currencyFormatted = currency.toLowerCase();
    const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/';
    const API_URL = `${PROXY_URL}http://api.nbp.pl/api/exchangerates/rates/a/${currencyFormatted}/${currencyValueDate}/?format=json`;

    const response = await fetch(API_URL, {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
    });
    const data = await response.json();

    return data;
}