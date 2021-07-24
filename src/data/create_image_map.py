import json

with open('src/data/recipesComplete.json', 'r') as ingredients:
    recipe_data = json.load(ingredients)

new_recipes = {}

for recipe in recipe_data:
    new_recipes[recipe.get('img')
                ] = "require(./images/smoothies/" + str(recipe.get('img')) + ");"

with open('src/data/imageMap.json', 'w') as f:
    json.dump(new_recipes, f, indent=2)
