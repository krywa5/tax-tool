import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => (
    {
        loader: ({ color, isSmall, isFullscreen }) => ({
            display: 'inline-block',
            height: isSmall ? '16px' : '30px',
            width: isSmall ? '16px' : '30px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTop: color ? `3px solid ${color}` : `3px solid ${theme.palette.secondary.main}`,
            animation: 'rotate 1.5s infinite linear',
            verticalAlign: 'sub',
            position: isFullscreen
        }),
        wrapper: ({ isFullscreen }) => ({
            display: isFullscreen ? 'grid' : 'inline',
            position: isFullscreen ? 'fixed' : 'static',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '100',
            placeItems: 'center',
        })
    }
))

const Loader = props => {
    const classes = useStyles(props);

    return (
        <span className={classes.wrapper}>
            <span className={classes.loader}></span>
        </span>
    );
}

export default Loader;