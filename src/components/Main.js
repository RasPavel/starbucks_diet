import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Button} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import BarChart from "./BarChart";
import MealPlan from "./MealPlan";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(4),
    },
    spinner: {
        marginTop: theme.spacing(2),
    }
}));


function Main() {
    const classes = useStyles();

    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [gender, setGender] = useState("M");
    const [age, setAge] = useState(25);
    const [activityLevel, setActivityLevel] = useState(1.2);
    const [debugText, setDebugText] = useState("debug text");
    const [optimal, setOptimal] = useState();
    const [suggested, setSuggested] = useState();
    const [diet, setDiet] = useState();
    const [loading, setLoading] = useState(false);

    const re = /^[0-9\b]+$/;
    function handleWeightChange(event) {
        if (event.target.value === '' || re.test(event.target.value)) {
            setWeight(event.target.value);
        }
    }

    function handleHeightChange(event) {
        if (event.target.value === '' || re.test(event.target.value)) {
            setHeight(event.target.value);
        }
    }

    function handleAgeChange(event) {
        if (event.target.value === '' || re.test(event.target.value)) {
            setAge(event.target.value);
        }
    }

    function handleGenderChange(event) {
        setGender(event.target.value);
    }

    function handleActivityLevelChange(event) {
        setActivityLevel(event.target.value);
    }

    function handleOnClick(event) {
        const params = {
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            activityLevel: activityLevel,
        }
        setLoading(true);
        axios.post("diet", params).then((response) => {
            setOptimal(response.data.optimal);
            setSuggested(response.data.suggested);
            setDiet(response.data.diet);
            setLoading(false);
        })
    }


    return (
        <Container>
            <Container className={classes.paper} maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField id="input-weight" label="Weight" name="weight" value={weight}
                                   variant="outlined" onChange={handleWeightChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="input-height" label="Height" name="height" value={height}
                                   variant="outlined" onChange={handleHeightChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="input-age" label="Age" name="age" value={age}
                                   variant="outlined" onChange={handleAgeChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={handleGenderChange}>
                            <FormControlLabel value="M" control={<Radio color="primary"/>} label="Male" />
                            <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Activity level</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Select id="demo-simple-select" labelId="select-activitylevel-label" value={activityLevel}
                                onChange={handleActivityLevelChange}>
                            <MenuItem value={1.2}>Sedentary: little or no exercise</MenuItem>
                            <MenuItem value={1.55}>Light: exercise 1-2 times a week</MenuItem>
                            <MenuItem value={1.65}>Moderate: exercise 2-4 times a week</MenuItem>
                            <MenuItem value={1.8}>Heavy: daily exercises</MenuItem>
                            <MenuItem value={2.0}>Extra heavy: very intense daily exercises</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Button onClick={handleOnClick} variant="contained" color="primary" className={classes.button}>
                    Create meal plan
                </Button>
                {loading && <CircularProgress className={classes.spinner}/>}
            </Container>

            <BarChart optimal={optimal} suggested={suggested}/>
            <MealPlan meals={diet}/>
        </Container>
    );
}

export default Main;