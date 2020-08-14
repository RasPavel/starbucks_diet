import pandas as pd
import numpy as np
from itertools import chain


menu_drinks = pd.read_csv('../data/menu_drinks.csv')
menu_food = pd.read_csv('../data/menu_food.csv')
menu_drinks_dict = menu_drinks.item.to_dict()
menu_food_dict = menu_food.item.to_dict()


class Diet:
    drinks = [] # array of drink ids (exactly one drink per meal is required)
    food = []   # array of sets of food ids (any number of food items per meal is allowed)

    def __init__(self, diet=None):
        if diet is not None:
            self.drinks = [s.copy() for s in diet.drinks]
            self.food = [s.copy() for s in diet.food]
        else:
            # initialize randomly
            self.drinks = np.random.choice(range(len(menu_drinks)), 3 * 7)
            self.food = [set(np.random.choice(range(len(menu_food)), np.random.randint(1, 5)))
                         for _ in range(3 * 7)]

    def __repr__(self):
        return f'<Drinks: {self.drinks} Food: {self.food}>'

    def aslist(self):
        meals = []
        for day in range(7):
            day_meals = []
            for j in range(3):
                meal = []
                meal.append(menu_drinks_dict[self.drinks[day * 3 + j]])
                meal.extend(menu_food_dict[x] for x in self.food[day * 3 + j])
                day_meals.append(meal)
            meals.append(day_meals)

        return meals


nutrient_list = ['calories', 'protein', 'fat', 'carbs']


def get_nutrients(diet):
    nutrients = np.zeros(shape=(7,len(nutrient_list)))
    for day in range(7):
        for i in range(3):
            drink = diet.drinks[day * 3 + i]
            food = diet.food[day * 3 + i]

            drink_food = pd.concat([menu_drinks.iloc[drink], menu_food.iloc[list(food)]])
            nutrients[day] += drink_food[nutrient_list].sum().to_numpy()

    return pd.DataFrame(data=nutrients, columns=nutrient_list, index=['Mon', 'Tue', 'Wed', 'Thu', 'Fri',
                                                                'Sat', 'Sun'])


def get_optimal_nutrients(weight, height, age, gender, activity_level):
    if gender == 'M':
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    else:
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age

    calories = int(bmr * activity_level)
    fat = int(calories * 0.25 / 9)
    protein = int(calories * 0.25 / 4)
    carbs = int(calories * 0.5 / 4)

    return pd.Series(data=[calories, protein, fat, carbs], index=nutrient_list)


def ga_solve(optimal_nutrients, population_size=20, n_gens=3):
    population = [Diet() for _ in range(population_size)]

    for _ in range(n_gens):
        population.sort(key=lambda diet: fitness(optimal_nutrients, diet))

        new_population = population[:int(population_size * 0.3)]

        while len(new_population) < population_size:
            mom_i, dad_i = np.random.choice(range(int(population_size * 0.5)), 2, replace=False)
            child = crossover(population[mom_i], population[dad_i])
            new_population.append(child)
            new_population.append(mutate(child))

    return population[0]


def mutate(diet, p=0.05):
    new_diet = Diet(diet)

    for i in range(7 * 3):
        if np.random.random() < p:
            new_diet.drinks[i] = np.random.choice(range(len(menu_drinks)))
        if np.random.random() < p:
            new_diet.food[i] = set(np.random.choice(range(len(menu_food)), np.random.randint(1,5)))

    return new_diet


def fitness(optimal_nutrients, diet, alpha=0.01):
    # alpha - penalizes repetitive items on the menu

    drink_repetitions = 7 * 3 - len(set(diet.drinks))
    food_repetitions = sum(len(s) for s in diet.food) - len(set(chain.from_iterable(diet.food)))

    # calculate MAPE for each nutrient across days - error between nutrition needs
    # and nutritional values of the meal
    mapes = (abs(get_nutrients(diet) - optimal_nutrients) / get_nutrients(diet)).mean()
    mape = mapes.mean() # average all MAPEs across different nutrients

    return mape + (drink_repetitions + food_repetitions) * alpha


def crossover(mom, dad):
    # each meal of the day is randomly chosen from mom and dad
    child = Diet(mom)

    for i in range(7 * 3):
        if np.random.random() > 0.5:
            child.drinks[i] = dad.drinks[i]
            child.food[i] = dad.food[i].copy()
    return child