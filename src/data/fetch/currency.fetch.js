export const currencyFetch = async (
  currencyValueDate = "",
  currency = "EUR"
) => {
  const currencyFormatted = currency.toLowerCase();
  const PROXY_URL = "https://secret-ocean-49799.herokuapp.com/";
  const API_URL = `${PROXY_URL}http://api.nbp.pl/api/exchangerates/rates/a/${currencyFormatted}/${currencyValueDate}/?format=json`;

  const response = await fetch(API_URL, {
    headers: {
      Origin: "null",
    },
  });
  const data = await response.json();
  return data;
};
