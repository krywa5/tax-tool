import { TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { numToStr } from 'utils';
import { ClickableField } from '..';

const useStyles = makeStyles(theme => ({
    emptyCell: {
        border: 'unset'
    },
    overallCell: {
        fontSize: '1.25rem',
        color: theme.palette.common.black,

        "&:hover": {
            color: theme.palette.primary.main,
        }
    }
}))

const OverallCounters = ({ values, currency, country }) => {
    const classes = useStyles();
    const { taxAbroad, incomeAbroad, taxPLN, incomePLN } = values;

    let numberOfEmptyCols = 0;

    //TODO: zrobić tę część w bardziej programistyczny sposób
    switch (country) {
        case 'netherlands':
            numberOfEmptyCols = 6;
            break;
        case 'belgium':
            numberOfEmptyCols = 7;
            break;
        case 'france':
            numberOfEmptyCols = 7;
            break;
        case 'germany':
            numberOfEmptyCols = 7;
            break;
        default:
            numberOfEmptyCols = 7;
            break;
    }

    const emptyCols = (function () {
        const output = [];
        for (let index = 0; index < numberOfEmptyCols; index++) {
            output.push(<TableCell key={index} className={classes.emptyCell}></TableCell>);
        }
        return output;
    })();



    return (
        <TableRow>
            {emptyCols}
            {
                taxAbroad ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(taxAbroad)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            {
                incomeAbroad ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(incomeAbroad)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            {
                taxPLN ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(taxPLN)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            {
                incomePLN ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(incomePLN)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            <TableCell className={classes.emptyCell}></TableCell>
        </TableRow>
    );
}

export default OverallCounters;