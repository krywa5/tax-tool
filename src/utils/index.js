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