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

    return number.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlace,
        maximumFractionDigits: decimalPlace,
    })

    // return number.toFixed(decimalPlace).replace('.', ',');
}

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
    // console.log(`ostateczna data: ${newDate}`);
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
    return Math.round(days / 30);
}