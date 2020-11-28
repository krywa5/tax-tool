import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import logoPrimary from 'assets/images/logo-primary.png';
import logoSecondary from 'assets/images/logo-secondary.png';

const useStyles = makeStyles(theme => {
    return {
        logo: {
            maxWidth: '150px',
            height: 'auto',
            userSelect: 'none',
        }
    }
});


const Logo = ({ isSecondary, className }) => {
    const classes = useStyles();

    return (
        <img id="logo" className={`${classes.logo} ${className}`} src={isSecondary ? logoSecondary : logoPrimary} alt="logo" />
    );
}

export default Logo;