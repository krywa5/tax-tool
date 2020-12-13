import React, { useContext, useState } from 'react';
import { CountryContext } from 'context/CountryContext';
import { Portal, Container, Typography, List, ListItem } from '@material-ui/core';
// import { CancelOutlinedIcon, InfoOutlinedIcon } from '@material-ui/icons';
// import { CancelOutlinedIcon, InfoOutlinedIcon } from '@material-ui/icons';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    panelWrapper: isTipsActive => ({
        position: 'fixed',
        top: '50%',
        left: '0',
        transform: isTipsActive ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
        borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
        backgroundColor: theme.palette.secondary.main,
        width: '350px',
        padding: '20px 35px',
        transition: `transform ${theme.transitions.duration.medium}ms ${theme.transitions.easing.easeInOut}`,
        boxShadow: theme.shadows[10],
    }),
    singleTip: {
        listStyleType: 'default',
        padding: '0',
        display: 'list-item',
        marginBottom: '10px',
        "&:last-child": {
            marginBottom: '0',
        }
    },
    showTips: isTipsActive => ({
        position: 'absolute',
        top: '50%',
        left: '100%',
        background: theme.palette.secondary.main,
        transform: 'translateY(-50%)',
        display: 'flex',
        width: 'fit-content',
        textAlign: 'center',
        padding: '15px',
        transformOrigin: 'top left',
        borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
        fontSize: '20px',
        opacity: isTipsActive ? '0' : '1',
        visibility: isTipsActive ? 'hidden' : 'visible',
        cursor: 'pointer',
        backfaceVisibility: 'hidden',
        transition: `${theme.transitions.duration.medium}ms 0.2s ${theme.transitions.easing.easeInOut}`,
    }),
    hideTip: {
        width: '25px',
        height: 'auto',
        position: 'absolute',
        top: '15px',
        right: '15px',
        cursor: 'pointer',
    },
    title: {
        fontWeight: '700',
        marginBottom: '15px',
    },
    list: {
        listStyle: 'disc',
    }
}))

const TipsPanel = () => {
    const { countryData } = useContext(CountryContext);
    const [isTipsActive, setIsTipsActive] = useState(false);
    const classes = useStyles(isTipsActive);

    const { tips } = countryData;
    const areTipsAvailable = tips?.length ? true : false;

    return (
        <>
            {areTipsAvailable ?
                <Portal container={document.getElementById('tax-tool')}>
                    <Container disableGutters className={`${classes.panelWrapper} no-print`} component='aside'>
                        <Container disableGutters className={classes.showTips} onClick={() => setIsTipsActive(true)}>
                            <InfoOutlinedIcon />
                        </Container>
                        <Container disableGutters>
                            <CancelOutlinedIcon className={classes.hideTip} onClick={() => setIsTipsActive(false)} title="Schowaj" />
                            <Typography variant="h6" align='center' className={classes.title}>Pamiętaj</Typography>
                            <List className={classes.list}>
                                {tips.map((tip, i) => (
                                    <ListItem key={i} className={classes.singleTip}>
                                        <Typography variant="body1">{tip}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Container>
                    </Container>
                </Portal>
                :
                null
            }
        </>

    );
}

export default TipsPanel;