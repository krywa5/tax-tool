import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import logoPrimary from 'assets/images/logo-primary.png';
import logoSecondary from 'assets/images/logo-secondary.png';

const useStyles = makeStyles(theme => {
    return {
        logo: {
            position: 'fixed',
            top: '48px',
            left: '48px',
            maxWidth: '150px',
            height: 'auto',
        }
    }
});


const Logo = ({ isSecondary }) => {
    const classes = useStyles();

    return (
        <img id="logo" className={classes.logo} src={isSecondary ? logoSecondary : logoPrimary} alt="logo" />
    );
}

export default Logo;