import React, { useContext } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import { numToStr, toPolishDateFormat } from 'utils';
import { CountryContext } from 'context/CountryContext';
import { ClickableField, OverallCounters } from 'components/Country/components';

const useStyles = makeStyles(theme => ({
    table: {
        "& thead th": {
            fontWeight: 600,
            fontSize: '1rem',
            textAlign: 'center',

            "@media print": {
                fontSize: '.75rem',
                lineHeight: '1.25',
                padding: '10px 5px',
            }
        },
        "& td": {
            textAlign: 'center',

            "@media print": {
                fontSize: '.75rem',
                padding: '10px 5px',
            }
        }
    },
    deleteBtn: {
        color: theme.palette.error.dark,
    }
}));

const IncomesTable = () => {
    const classes = useStyles();
    const { removeIncome, countryData, calculator } = useContext(CountryContext);
    const incomeList = calculator.incomes;

    const overallValues = {
        taxAbroad: 0,
        incomeAbroad: 0,
        taxPLN: 0,
        incomePLN: 0,
    }

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Lp.</TableCell>
                        {
                            countryData.inputs.manual.includes("startDate") &&
                            <TableCell>Data rozpoczęcia</TableCell>
                        }
                        {
                            countryData.inputs.manual.includes("endDate") &&
                            <TableCell>Data zakończenia</TableCell>
                        }
                        {
                            countryData.inputs.manual.includes("paymentDate") &&
                            <TableCell>Data wypłaty</TableCell>
                        }
                        {
                            countryData.inputs.manual.includes("daysInPoland") &&
                            <TableCell>Dni w Polsce</TableCell>
                        }
                        <TableCell>Tabela</TableCell>
                        <TableCell>Kurs waluty</TableCell>
                        {
                            countryData.inputs.manual.includes("paidTax") &&
                            <TableCell>Podatek {countryData.currency}</TableCell>
                        }
                        {
                            countryData.inputs.manual.includes("holidayIncome") &&
                            <TableCell>Przychód wakacyjny</TableCell>
                        }
                        {
                            countryData.inputs.manual.includes("income") &&
                            <TableCell>Przychód {countryData.currency}</TableCell>
                        }
                        {
                            countryData.inputs.manual.includes("paidTax") &&
                            <TableCell>Podatek PLN</TableCell>
                        }
                        <TableCell>Przychód PLN</TableCell>
                        <TableCell className="no-print"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {incomeList.map((incomeData, index) => {
                        const { id, startDate, endDate, incomeAbroad, paidTax, holidayIncome, paymentDate, currencyValue, currencyTable, daysInPoland, taxPLN, incomePLN } = incomeData;
                        const { manual: manualFields, auto: autoFields } = countryData.inputs;

                        // count overall values
                        overallValues.taxAbroad += paidTax;
                        overallValues.incomeAbroad += incomeAbroad;
                        overallValues.taxPLN += taxPLN;
                        overallValues.incomePLN += incomePLN;

                        return (
                            <TableRow key={id}>
                                <TableCell>{index + 1}.</TableCell>
                                {
                                    manualFields.includes("startDate") &&
                                    <TableCell>{toPolishDateFormat(startDate)}</TableCell>
                                }
                                {
                                    manualFields.includes("endDate") &&
                                    <TableCell>{toPolishDateFormat(endDate)}</TableCell>
                                }
                                {
                                    manualFields.includes("paymentDate") &&
                                    <TableCell>{toPolishDateFormat(paymentDate)}</TableCell>
                                }
                                {
                                    manualFields.includes("daysInPoland") &&
                                    <TableCell>{Number(daysInPoland)}</TableCell>
                                }
                                <TableCell>{currencyTable}</TableCell>
                                <TableCell>{numToStr(currencyValue, 4)}</TableCell>
                                {
                                    manualFields.includes("holidayIncome") &&
                                    <TableCell>{numToStr(holidayIncome)}</TableCell>
                                }
                                {
                                    manualFields.includes("paidTax") &&
                                    <TableCell>{numToStr(paidTax)}</TableCell>
                                }
                                {
                                    manualFields.includes("income") &&
                                    <TableCell>
                                        {numToStr(incomeAbroad)}
                                    </TableCell>
                                }
                                {
                                    autoFields.includes("taxValue") &&
                                    <TableCell>
                                        <ClickableField>
                                            {numToStr(taxPLN)}
                                        </ClickableField>
                                    </TableCell>
                                }
                                <TableCell>
                                    <ClickableField>
                                        {numToStr(incomePLN)}
                                    </ClickableField>
                                </TableCell>
                                <TableCell className="no-print">
                                    <IconButton aria-label="delete" size='small' className={classes.deleteBtn} onClick={() => removeIncome(id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    {

                        <OverallCounters values={overallValues} country={countryData.id} />
                    }
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default React.memo(IncomesTable);