import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: 'inherit',
        transition: `color ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`,

        "&:hover": {
            color: theme.palette.secondary.main,
        }
    }
}))

const Copyright = () => {
    const classes = useStyles();

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Copyright © <a href="mailto:k.wasilewski92@gmail.com" target='_blank' rel='noopener noreferrer' className={classes.link}><strong>Krystian Wasilewski</strong></a> {new Date().getFullYear()}
        </Typography>
    );
}

export default Copyright;