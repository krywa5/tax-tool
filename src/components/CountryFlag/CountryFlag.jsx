import React, { useContext } from 'react';
import belgiumFlag from 'assets/images/flags/belgium.jpg';
import franceFlag from 'assets/images/flags/france.jpg';
import germanyFlag from 'assets/images/flags/germany.jpg';
import netherlandsFlag from 'assets/images/flags/netherlands.jpg';
import { makeStyles } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import { useHistory } from 'react-router-dom';
import ROUTES from 'routes';

const useStyles = makeStyles(theme => ({
    listItem: {
        maxWidth: "80px",
        marginRight: '20px',
        cursor: "pointer",
        boxShadow: theme.shadows[5],
        position: 'relative',
        transition: `transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
        userSelect: 'none',

        "&:last-child": {
            marginRight: '0',
        },

        "&::before": {
            content: "''",
            display: 'block',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            opacity: '0',
            boxShadow: theme.shadows[15],
            transition: `opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`
        },

        "&:hover, &.selected": {
            transform: 'translateY(-2px)',

            "&::before": {
                opacity: '1',
            }
        },
        '&.selected': {
            outline: `3px solid ${theme.palette.secondary.main}`
        }
    },
}))

const CountryFlag = ({ country }) => {
    const classes = useStyles();
    const history = useHistory();
    const { selectedCountry, setSelectedCountry } = useContext(AppContext);

    const getProperFlag = () => {
        switch (country) {
            case 'belgium':
                return belgiumFlag;
            case 'france':
                return franceFlag;
            case 'germany':
                return germanyFlag;
            case 'netherlands':
                return netherlandsFlag;
            default:
                break;
        }
    }

    const clickHandler = () => {
        if (country === selectedCountry) {
            setSelectedCountry('');
            history.push(`${ROUTES.taxTool}`);
        } else {
            setSelectedCountry(country);
            history.push(`${ROUTES.taxTool}/${country}`)
        }
    }

    return (
        <li className={`${classes.listItem} ${country === selectedCountry ? 'selected' : ''}`} onClick={clickHandler}>
            <img src={getProperFlag()} alt="country flag" />
        </li>
    );
}

export default CountryFlag;