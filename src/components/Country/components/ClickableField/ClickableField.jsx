import React from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        display: 'inline',
        cursor: 'pointer',

        "& input": {
            cursor: 'pointer',
        }
    }
})

const ClickableField = ({ children }) => {
    const classes = useStyles();

    const copyToClipboard = (e) => {
        let value = e.target.innerText;

        // jeśli target jest inputem to bierzemy jego value
        if (e.target.matches('input')) {
            value = String(e.target.value).replace('.', ',');
        }

        const formattedValue = value.split(/\s/).join('');

        navigator.clipboard.writeText(formattedValue)
            .then(
                () => {
                    toast.success(`Wartość ${value} skopiowano do schowka`, {
                        position: 'top-center',
                        autoClose: 2000,
                    });
                },
                err => {
                    toast.error('Wystąpił błąd podczas kopiowania wartości. Przepisz ją ręcznie.');
                    console.error(err);
                }
            );
    }

    return (
        <div onClick={copyToClipboard} className={classes.container}>
            {children}
        </div>
    );
}

export default ClickableField;