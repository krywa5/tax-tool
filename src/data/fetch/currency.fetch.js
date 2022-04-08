export const currencyFetch = async (
  currencyValueDate = "",
  currency = "EUR"
) => {
  const currencyFormatted = currency.toLowerCase();
  const API_URL = `http://api.nbp.pl/api/exchangerates/rates/a/${currencyFormatted}/${currencyValueDate}/?format=json`;

  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
