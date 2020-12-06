import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';

const useStyles = makeStyles(theme => ({
    labelWrapper: {
        display: 'flex',
        flexDirection: 'column',
        paddingRight: "15px",
    },
    label: {
        // marginBottom: '.5em',
    },
    sublabel: {
        color: theme.palette.primary.main,
        marginBottom: '.3em',

        "&:nth-of-type(1)": {
            marginTop: '10px',
        }
    }
}))

const InputLabel = ({ label = '', labelFor = '', sublabels = [] }) => {
    const classes = useStyles();

    if (typeof sublabels === 'string') sublabels = [sublabels];

    return (
        <label className={classes.labelWrapper} htmlFor={labelFor}>
            <Typography variant="h5" className={classes.label}>{label}</Typography>
            {sublabels.map(sublabel => {
                if (!sublabel) return false;
                return (
                    <Typography key={uid(sublabel)} variant="body2" className={classes.sublabel}>{sublabel}</Typography>
                )
            })}
        </label>
    );
}

InputLabel.propTypes = {
    label: PropTypes.string.isRequired,
    labelFor: PropTypes.string.isRequired,
    sublabels: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
}

export default InputLabel;