import json
from fuzzywuzzy import fuzz
import re


def wash_ingredient(ingredient):
    # remove numbers
    result = ''.join([i for i in ingredient if not i.isdigit()])
    # remove symbols
    result = re.sub(r'[^\w]', ' ', result)
    # shift to lower
    result = result.lower()

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
        'half',
        'container',
        'such',
    ]

    measurements_plurals = []

    # add plurals
    for measurement in measurements:
        measurements_plurals.append(measurement)
        measurements_plurals.append(measurement + 's')

    # remove measurements
    for measurement in measurements_plurals:
        result = result.replace(measurement, '')

    # trim white space from ends
    result = re.sub(r"^\s+|\s+$", "", result)

    return result


with open('selectedRecipes.json', 'r') as selectedRecipes:
    recipe_data = json.load(selectedRecipes)

with open('ingredientsWithNutrition.json', 'r') as ingredients:
    ingredient_data = json.load(ingredients)

recipesWithNutrition = []

for recipe in recipe_data:
    recipe["autoIngredients"] = []

    for innerIngredient in recipe.get("ingredients"):
        for outerIngredient in ingredient_data:
            match = fuzz.token_set_ratio(
                wash_ingredient(innerIngredient), outerIngredient["name"].lower())
            if(match > 75):
                recipe["autoIngredients"].append(outerIngredient["name"])

    if "Orange" in recipe["autoIngredients"] and "Orange Juice" in recipe["autoIngredients"]:
        recipe["autoIngredients"].remove("Orange")

    if "Bananas" in recipe["autoIngredients"] and "Frozen Banana" in recipe["autoIngredients"]:
        recipe["autoIngredients"].remove("Bananas")

    if len(recipe["autoIngredients"]) >= len(recipe["ingredients"]) - 1 and len(recipe["autoIngredients"]) <= len(recipe["ingredients"]) + 1:
        recipesWithNutrition.append(recipe)


print('dropped: ' + str(len(recipe_data) - len(recipesWithNutrition)))
print('remaining: ' + str(len(recipesWithNutrition)))

with open('recipesWithNutrition.json', 'w') as f:
    json.dump(recipesWithNutrition, f, indent=2)
