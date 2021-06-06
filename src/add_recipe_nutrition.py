import json
from fuzzywuzzy import fuzz
import re


def wash_ingredient(ingredient):
    result = ''.join([i for i in ingredient if not i.isdigit()])
    result = re.sub(r'[^\w]', ' ', result)
    result = re.sub(r"^\s+|\s+$", "", result)

    measurements = [
        'teaspoon',
        'tablespoon',
        'spoon',
        'fork',
        'cup',
        'fluid',
        'ounce',
        'gill',
        'pint',
        'quart',
        'gallon',
        'milliliter',
        'millilitre',
        'liter',
        'litre',
        'deciliter',
        'decilitre',
        'pound',
        'milligram',
        'gram',
        'chopped',
        'diced',
        'halved',
        'pitted',
        'divided',
        'broken',
        'into',
        'chunks',
        'hulled',
        'in',
        'half',
        'container',
        'such',
        'as',
        'uv',
    ]

    for measurement in measurements:
        measurements.append(measurement + 's')

    for measurement in measurements:
        result.replace(measurement, '')

    return result


with open('selectedRecipes.json', 'r') as selectedRecipes:
    recipe_data = json.load(selectedRecipes)

with open('ingredientsWithNutrition.json', 'r') as ingredients:
    ingredient_data = json.load(ingredients)

recipesWithNutrition = []

for recipe in recipe_data[0:2]:
    recipe["autoIngredient"] = []

    # parse each ingredient string to see if it matches any ingredients
    # if it does add that ingredient name to autoIngredient prop

    for innerIngredient in recipe.get("ingredients"):
        test = wash_ingredient(innerIngredient)
        print(test)
        for outerIngredient in ingredient_data:
            match = fuzz.token_set_ratio(
                innerIngredient.lower(), outerIngredient["name"].lower())
            if(match > 70):
                recipe["autoIngredient"].append(outerIngredient["name"])

    recipesWithNutrition.append(recipe)


with open('recipesWithNutrition.json', 'w') as f:
    json.dump(recipesWithNutrition, f, indent=2)
