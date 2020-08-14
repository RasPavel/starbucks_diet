import React, {useEffect, useState} from "react";
import Chart from "react-google-charts";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


function BarChart(props) {
    if (props.optimal && props.suggested) {
        return (
            <div style={{ display: 'flex', maxWidth: 900 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            We have created a meal plan that best fits your daily nutritional needs:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Chart
                            width={600}
                            height={300}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['What', 'Needs', 'Meal plan'],
                                ['Calories', props.optimal.calories, props.suggested.calories],
                            ]}
                            options={{
                                hAxis: {
                                    title: 'calories',
                                    minValue: 0,
                                },
                            }}
                            legendToggle
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Chart
                            width={600}
                            height={300}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['What', 'Needs', 'Meal plan'],
                                ['Protein', props.optimal.protein, props.suggested.protein],
                                ['Fat', props.optimal.fat, props.suggested.fat],
                                ['Carbs', props.optimal.carbs, props.suggested.carbs],
                            ]}
                            options={{
                                hAxis: {
                                    title: 'grams',
                                    minValue: 0,
                                },
                            }}
                            legendToggle
                        />
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return null;
    }

}

export default BarChart;


