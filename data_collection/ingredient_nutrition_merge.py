import json

with open('ingredientsNoNutrition.json', 'r') as ingredients:
    ingredient_data = json.load(ingredients)

with open('masterNutrition.json', 'r') as nutrition:
    nutrition_data = json.load(nutrition)

print(ingredient_data)

allIngredients = []

for ingredient in ingredient_data:
    nutrition = {}

    for item in nutrition_data:
        if item.get("name") == ingredient.get("pullNutritionFrom"):
            ingredient["nutrition"] = item["nutrition"]

    allIngredients.append(ingredient)


with open('ingredientsWithNutrition.json', 'w') as f:
    json.dump(allIngredients, f, indent=2)
