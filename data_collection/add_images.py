import json

with open('src/data/recipesWithNutrition.json', 'r') as ingredients:
    recipe_data = json.load(ingredients)

new_recipes = []

for recipe in recipe_data:
    temp = recipe
    temp['img'] = recipe.get('title') + ' Smoothie' + '.png'
    temp['img'] = temp['img'].replace(' ', '')
    temp['title'] = recipe.get('title').strip()
    new_recipes.append(temp)

with open('src/data/recipesComplete2.json', 'w') as f:
    json.dump(new_recipes, f, indent=2)
