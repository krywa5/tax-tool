import { makeStyles } from "@material-ui/styles";
import React from "react";
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import { Button, Portal } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    printBtn: {
        position: 'fixed',
        bottom: '50px',
        right: '50px',
        padding: '20px 27px',
        backgroundColor: theme.palette.secondary.main,
        transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,
        outline: 'none',
        animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut}`,

        '&:hover': {
            transform: 'translateY(-2px)',
        },
        "@media (max-width: 1730px)": {
            bottom: '75px',
            right: '75px',
        }
    },
    printIcon: {
        fontSize: '40px',
    },
}))

const PrintButton = () => {
    const classes = useStyles();

    return (
        <Portal container={document.getElementById('tax-tool')} >
            <Button
                className={`${classes.printBtn} no-print`}
                variant="contained"
                color="secondary"
                onClick={() => {
                    window.print();
                }}
            >
                <PrintOutlinedIcon className={classes.printIcon} />
            </Button>
        </Portal>
    );
};

export default PrintButton;
