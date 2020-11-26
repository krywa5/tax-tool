import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => (
    {
        root: ({ color, isSmall }) => ({
            display: 'inline-block',
            height: isSmall ? '21px' : '30px',
            width: isSmall ? '21px' : '30px',
            padding: '9px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTop: color ? `3px solid ${color}` : `3px solid ${theme.palette.secondary.main}`,
            animation: 'rotate 1.5s infinite linear',
        })
    }
))

const Loader = ({ color, isSmall }) => {
    const classes = useStyles({ color, isSmall });

    return (
        <span className={classes.root}></span>
    );
}

export default Loader;