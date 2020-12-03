export const currencyFetch = (currencyValueDate = '', currency = '') => {
    const currencyFormatted = currency.toLowerCase();
    const API_URL = `https://cors-anywhere.herokuapp.com/http://api.nbp.pl/api/exchangerates/rates/a/${currencyFormatted}/${currencyValueDate}/?format=json`;

    fetch(API_URL)
        .then((response) => response.json())
        .then((data) =>
            console.log(data)
            //   this.setState({
            //     currencyValue: data.rates[0].mid.toFixed(4),
            //     currencyValueDate: data.rates[0].effectiveDate,
            //     currencyValueDateAPI: data.rates[0].effectiveDate,
            //     currencyTable: data.rates[0].no,
            //   })
        )
        .catch((error) => {
            console.error(error);
            alert(
                "Wystąpił błąd przy pobieraniu kursu waluty."
            );
        });
}