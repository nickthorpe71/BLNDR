import json


with open('ingredientsNoNutrition.json', 'r') as ingredients:
    ingredient_data = json.load(ingredients)

with open('masterBulkIngredients.json', 'r') as nutrition:
    nutrition_data = json.load(nutrition)

for ingredient in ingredient_data:


with open('ingredientsNoNutrition.json', 'w') as f:
    json.dump(allIngredients, f, indent=2)
