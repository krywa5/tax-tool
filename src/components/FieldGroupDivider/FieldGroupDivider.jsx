import { Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    dividerWrapper: {
        padding: '10px',
        textAlign: 'center',
        borderTop: `1px solid ${theme.palette.common.black}`,
        borderBottom: `1px solid ${theme.palette.common.black}`,
        background: theme.palette.secondary.main,
    }
}))

const FieldGroupDivider = ({ text = '', ...rest }) => {
    const classes = useStyles();

    return (
        <div className={classes.dividerWrapper}>
            <Typography variant="body1">{text}</Typography>
        </div>
    );
}

FieldGroupDivider.propTypes = {
    text: PropTypes.string,
}

export default FieldGroupDivider;