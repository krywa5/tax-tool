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

const isDateWeekendOrDayOff = date => { // date is supposed to be Date object
    if (!date) return false;

    let dateObj = typeof date === 'object' ? date : new Date(date);

    let isWeekend = false;
    const dayIndex = dateObj.getDay();
    const saturdayIndex = 6;
    const sundayIndex = 0;

    if (
        dayIndex === saturdayIndex ||
        dayIndex === sundayIndex ||
        daysOffInPoland.includes(dateObj.toISOString().slice(5, 10)) || // check if regular day off
        irregularDaysOffInPoland.includes(dateObj.toISOString().slice(0, 10)) // check if irregular day off
    ) {
        isWeekend = true; // change flag if the day is weekend
    }

    return isWeekend;
}

export const getLastWorkingDay = date => {
    if (!date) return false;
    let isDayOff = false;
    let newDate = new Date(date);

    newDate.setDate(newDate.getDate() - 1); // always subtract one day from original date

    for (let i = 0; i < 7; i++) {
        // console.log(`Iteration nr ${i + 1}`);
        isDateWeekendOrDayOff(newDate) ? (isDayOff = true) : (isDayOff = false);

        if (isDayOff === true) {
            newDate.setDate(newDate.getDate() - 1);
        } else {
            break; // end the loop if the working the was found
        }
    }

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