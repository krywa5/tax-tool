import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Loader } from 'components';
import theme from 'theme';

const useStyles = makeStyles(theme => ({
    backdrop: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'rgba(0,0,0,.15)',
        zIndex: '1',
    }
}))

const LoadingBackdrop = () => {
    const classes = useStyles();

    return (
        <div className={classes.backdrop}>
            <Loader color={theme.palette.primary.light} />
        </div>
    );
}

export default LoadingBackdrop;