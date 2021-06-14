import json
from fuzzywuzzy import fuzz
import re


def convert_to_float(frac_str):
    if '/' in frac_str:
        try:
            return float(frac_str)
        except ValueError:
            num, denom = frac_str.split('/')
            try:
                leading, num = num.split(' ')
                whole = float(leading)
            except ValueError:
                whole = 0
            frac = float(num) / float(denom)
            return whole - frac if whole < 0 else whole + frac
    try:
        return float(frac_str)
    except ValueError:
        return 1


def has_numbers(input_str):
    return any(char.isdigit() for char in input_str)


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
		inner_split = innerIngredient.split(' ')

		for outerIngredient in ingredient_data:
			outer_split = outerIngredient["name"].split(' ')
			full_match = True
			already_contains = False

			for ingredient in recipe["autoIngredients"]:
				if "Orange" in ingredient["name"].split() and "Orange" in outerIngredient["name"].split():
					already_contains = True
				if "Almond" in ingredient["name"].split() and "Almond" in outerIngredient["name"].split():
					already_contains = True
				
			
			if already_contains:
				continue

			for outer_match_item in outer_split:
				match = fuzz.token_set_ratio(wash_ingredient(innerIngredient), outer_match_item.lower())
				if(match < 95):
					full_match = False

				if(full_match):
					measure_index = 1
					amount = inner_split[0]

					if has_numbers(inner_split[1]):
						amount += ' ' + inner_split[1]
						measure_index += 1

					measure = inner_split[measure_index]

					recipe["autoIngredients"].append(
						{'name': outerIngredient["name"], 'measure': measure, 'amount': convert_to_float(amount)})
					break

	if len(recipe["autoIngredients"]) >= len(recipe["ingredients"]) - 2 and len(recipe["autoIngredients"]) <= len(recipe["ingredients"]) + 2:
		recipesWithNutrition.append(recipe)

	


print('dropped: ' + str(len(recipe_data) - len(recipesWithNutrition)))
print('remaining: ' + str(len(recipesWithNutrition)))

with open('recipesWithNutrition.json', 'w') as f:
    json.dump(recipesWithNutrition, f, indent=2)
