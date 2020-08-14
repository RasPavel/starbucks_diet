import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Monday', 'Evolution Fresh™ Organic Ginger Limeade', 6.0, 24, 4.0),
    createData('Tuesday', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function MealPlan(props) {
    const days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const meal_names = ['Breakfast', 'Lunch', 'Dinner']

    const classes = useStyles();

    if (!props.meals) {
        return null;
    }

    return (
        <TableContainer component={Paper} style={{ whiteSpace: 'pre-line' }}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Day of week</TableCell>
                        <TableCell align="center">Breakfast</TableCell>
                        <TableCell align="center">Lunch</TableCell>
                        <TableCell align="center">Dinner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.meals.map((meal, i) => (
                        <TableRow key={days_of_week[i % 3]}>
                            <TableCell component="th" scope="row" variant="head">
                                {days_of_week[i % 3]}
                            </TableCell>
                            <TableCell width="30%" align="left">{meal[0].map(m => '• ' + m).join('\n')}</TableCell>
                            <TableCell width="30%" align="left">{meal[1].map(m => '• ' + m).join('\n')}</TableCell>
                            <TableCell width="30%" align="left">{meal[2].map(m => '• ' + m).join('\n')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );


}



export default MealPlan;