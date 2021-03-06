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
    recipe["totalNutrition"] = {
        "calories": 0,
        "fiber": {
            "measure": "G",
            "amount": 0
        },
        "macros": {
            "protein": {
                "measure": "G",
                "amount": 0
            },
            "fat": {
                "measure": "G",
                "amount": 0
            },
            "carbs": {
                "measure": "g",
                "amount": 0
            }
        },
        "totalSugars": {
            "measure": "G",
            "amount": 0
        },
        "vitamins": {
            "A": {
                "measure": "IU",
                "amount": 0
            },
            "C": {
                "measure": "MG",
                "amount": 0
            },
            "D": {
                "measure": "IU",
                "amount": 0
            }
        },
        "lipids": {
            "cholesterol": {
                "measure": "MG",
                "amount": 0.0
            },
            "saturated": {
                "measure": "G",
                "amount": 0
            },
            "trans": {
                "measure": "G",
                "amount": 0.0
            }
        },
        "minerals": {
            "calcium": {
                "measure": "MG",
                "amount": 0
            },
            "iron": {
                "measure": "MG",
                "amount": 0
            },
            "potassium": {
                "measure": "MG",
                "amount": 0
            },
            "sodium": {
                "measure": "MG",
                "amount": 0
            }
        }
    }

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
                if "Carrot" in ingredient["name"].split() and "Carrot" in outerIngredient["name"].split():
                    already_contains = True

            if already_contains:
                continue

            for outer_match_item in outer_split:
                match = fuzz.token_set_ratio(wash_ingredient(
                    innerIngredient), outer_match_item.lower())
                if(match < 95):
                    full_match = False

                if(full_match):
                    measure_index = 1
                    amount = inner_split[0]

                    if has_numbers(inner_split[1]):
                        amount += ' ' + inner_split[1]
                        measure_index += 1

                    measure = inner_split[measure_index]

                    float_amount = convert_to_float(amount)

                    recipe["autoIngredients"].append(
                        {'name': outerIngredient["name"], 'measure': measure, 'amount': float_amount})

                    recipe["totalNutrition"]["calories"] += outerIngredient["nutrition"]["nutrition"]["calories"] * float_amount
                    recipe["totalNutrition"]["fiber"]["amount"] += outerIngredient["nutrition"]["nutrition"]["fiber"]["amount"] * float_amount
                    recipe["totalNutrition"]["macros"]["protein"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["macros"]["protein"]["amount"] * float_amount
                    recipe["totalNutrition"]["macros"]["fat"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["macros"]["fat"]["amount"] * float_amount
                    recipe["totalNutrition"]["macros"]["carbs"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["macros"]["carbs"]["amount"] * float_amount
                    recipe["totalNutrition"]["totalSugars"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["totalSugars"]["amount"] * float_amount
                    recipe["totalNutrition"]["vitamins"]["A"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["vitamins"]["A"]["amount"] * float_amount
                    recipe["totalNutrition"]["vitamins"]["C"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["vitamins"]["C"]["amount"] * float_amount
                    recipe["totalNutrition"]["vitamins"]["D"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["vitamins"]["D"]["amount"] * float_amount
                    recipe["totalNutrition"]["lipids"]["cholesterol"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["lipids"]["cholesterol"]["amount"] * float_amount
                    recipe["totalNutrition"]["lipids"]["saturated"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["lipids"]["saturated"]["amount"] * float_amount
                    recipe["totalNutrition"]["lipids"]["trans"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["lipids"]["trans"]["amount"] * float_amount
                    recipe["totalNutrition"]["minerals"]["calcium"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["minerals"]["calcium"]["amount"] * float_amount
                    recipe["totalNutrition"]["minerals"]["iron"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["minerals"]["iron"]["amount"] * float_amount
                    recipe["totalNutrition"]["minerals"]["potassium"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["minerals"]["calcium"]["amount"] * float_amount
                    recipe["totalNutrition"]["minerals"]["sodium"]["amount"] += outerIngredient[
                        "nutrition"]["nutrition"]["minerals"]["sodium"]["amount"] * float_amount

                    break

    lower = len(recipe["ingredients"]) - 2
    upper = len(recipe["ingredients"]) + 2
    if len(recipe["autoIngredients"]) >= lower and len(recipe["autoIngredients"]) <= upper:
        recipesWithNutrition.append(recipe)


print('dropped: ' + str(len(recipe_data) - len(recipesWithNutrition)))
print('remaining: ' + str(len(recipesWithNutrition)))

with open('recipesWithNutrition.json', 'w') as f:
    json.dump(recipesWithNutrition, f, indent=2)
