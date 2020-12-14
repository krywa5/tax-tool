import { TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { numToStr } from 'utils';
import { ClickableField } from 'components/Country/components';

const useStyles = makeStyles(theme => ({
    emptyCell: {
        border: 'unset'
    },
    overallCell: {
        fontSize: '1.25rem',
        color: theme.palette.common.black,
        fontWeight: '600',

        "&:hover": {
            color: theme.palette.primary.main,
        }
    }
}))

const OverallCounters = ({ values, country, countersKeys }) => {
    const classes = useStyles();
    const { taxAbroad, incomeAbroad, taxPLN, incomePLN } = values;
    const { isTaxAbroad, isIncomeAbroad, isTaxPLN, isIncomePLN } = countersKeys;

    let numberOfEmptyCols = 0;

    //TODO: zrobić tę część w bardziej programistyczny sposób
    switch (country) {
        case 'netherlands':
            numberOfEmptyCols = 5;
            break;
        case 'belgium':
            numberOfEmptyCols = 6;
            break;
        case 'france':
            numberOfEmptyCols = 6;
            break;
        case 'germany':
            numberOfEmptyCols = 6;
            break;
        default:
            numberOfEmptyCols = 6;
            break;
    }

    const emptyCols = (() => {
        const output = [];
        for (let index = 0; index < numberOfEmptyCols; index++) {
            output.push(<TableCell key={index} className={classes.emptyCell}></TableCell>);
        }
        return output;
    })();

    return (
        <TableRow>
            {emptyCols}
            <TableCell className={classes.overallCell}>Łącznie</TableCell>
            {
                isTaxAbroad ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(taxAbroad)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            {
                isIncomeAbroad ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(incomeAbroad)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            {
                isTaxPLN ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(taxPLN)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            {
                isIncomePLN ?
                    <TableCell className={classes.overallCell}>
                        <ClickableField>{numToStr(incomePLN)}</ClickableField>
                    </TableCell>
                    :
                    null
            }
            <TableCell className={`${classes.emptyCell} no-print`}></TableCell>
        </TableRow>
    );
}

export default OverallCounters;