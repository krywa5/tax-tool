export const translateErrorCode = errorCode => {
    switch (errorCode) {
        case 'auth/insufficient-permission':
            return "Niewystarczające uprawnienia."
        case 'auth/internal-error':
            return "Błąd wewnętrzny serwera."
        case 'auth/user-disabled':
            return "Użytkownik wyłączony.";
        case 'auth/invalid-credential':
            return "Nieprawidłowe dane."
        case 'auth/invalid-email':
            return "Nieprawidłowy adres e-mail."
        case 'auth/invalid-password':
            return "Nieprawidłowe hasło."
        case 'auth/wrong-password':
            return 'Nieprawidłowe hasło';
        case 'auth/user-not-found':
            return "Nie znaleziono takiego użytkownika."
        default:
            return "Coś poszło nie tak."
    }
}

export const strToNum = (string = '') => {
    return Number(Number(string.replace(',', '.')).toFixed(2));
}

export const numToStr = (number = 0, decimalPlace = 2) => {
    if (number === "" || number === "0") return "0,00"; // hotfix for displaying holiday income in table
    let finalNumber = number;

    if (typeof number === 'string') {
        finalNumber = strToNum(number);
    }


    return finalNumber.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlace,
        maximumFractionDigits: decimalPlace,
    })

}

const daysOffInPoland = [
    '01-01',
    '01-06', // Trzech Króli
    '05-01',
    '05-03',
    '08-15', // Święto Wojska Polskiego
    '11-01',
    '11-11',
    '12-25',
    '12-26',
];

const irregularDaysOffInPoland = [
    '2020-04-12', // Wielkanoc
    '2020-04-13',
    '2020-05-31', // Zielone Świątki
    '2020-06-11', // Boże Ciało
]

export const getLastWorkingDay = (date) => {
    if (!date) return false;

    let output = false;
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    // console.log(newDate);
    !(newDate.getDay() % 6) ? (output = true) : (output = false);
    // console.log(`Pierwsza iteracja ${output}`);
    if (output === true) {
        newDate.setDate(newDate.getDate() - 1);
    }
    // console.log(newDate);
    !(newDate.getDay() % 6) ? (output = true) : (output = false);
    // console.log(`Druga iteracja ${output}`);
    if (output === true) {
        newDate.setDate(newDate.getDate() - 1);
    }
    // console.log(newDate);
    !(newDate.getDay() % 6) ? (output = true) : (output = false);
    // console.log(`Trzecia iteracja ${output}`);

    // check if the date is day off in Poland
    // first iteration
    if (daysOffInPoland.includes(newDate.toISOString().slice(5, 10)) || irregularDaysOffInPoland.includes(newDate.toISOString().slice(0, 10))) {
        newDate.setDate(newDate.getDate() - 1);
    }
    // second iteration
    if (daysOffInPoland.includes(newDate.toISOString().slice(5, 10)) || irregularDaysOffInPoland.includes(newDate.toISOString().slice(0, 10))) {
        newDate.setDate(newDate.getDate() - 1);
    }

    // TODO: DO DOPRACOWANIA - sprawdzenie czy znów nie wypada weekend 14-04-2020

    // console.log(`ostateczna data: ${newDate.toISOString().slice(0, 10)}`);
    return newDate.toISOString().slice(0, 10);
};

export const toPolishDateFormat = oldDate => {
    // oldData is expected to be in yyyy-mm-dd
    return oldDate.toString().split("-").reverse().join(".");
}

export const dateDiff = (startDate, endDate, daysToSubstract = 0) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    return Math.abs(Math.round((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)) - daysToSubstract + 1); // +1 because we include end date
}

export const daysToMonths = days => {
    return Math.max(Math.round(days / 30), 1); // 1 month is the minimum value
}