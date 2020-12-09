import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    table: {
        "& thead th": {
            fontWeight: 600,
            fontSize: '1rem',
            textAlign: 'center',
        }
    },
}))

const IncomesTable = ({ incomeList, countryData }) => {
    const classes = useStyles();

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {incomeList.map(income => (
                        <TableRow>

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>

                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default IncomesTable;