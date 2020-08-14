## Starbucks Meal Planner

### What is it?
Starbucks Meal Planner a web application that creates an optimal meal plan that consists exclusively of Starbucks menu items. Based on the user's weight, height and other parameters the app estimates macronutrient needs and runs stochastic optimization algorithm to produce a balanced, healthy and diverse meal plan for a week. 

### How to run this app:

0) Install the latest versions of yarn and node (>= 1.22.4 and v14.3.0 respectively) 
1) Clone the repository
2) Install the project dependencies  
`yarn install`
3) Start Flask development server at localhost:5000
`yarn start-api`
4) Start React development server and navigate to localhost:3000  
`yarn start`

# How it works:
User fills information about his body: weight, height, age, gender and activity level. These parameters are sent as a POST request to :5000/diet that is redirected to the flask server. Optimal macronutritional needs (calories, fat, proteins, carbs) are calculated according to some smart formula taken from some health journal. Then stochastic optimization algorithm is run to find the most suitable meal plan for the user. Optimal meal are chosen according to the following rules: each meal must include at least one drink and one food item, using food items more than once must be descouraged, daily nutritional values must be close to the user's nutritional needs. Genetic algorithm is used to run optimization, the best meal plan is presented to the user.

### Key technologies used:
Flask, React


