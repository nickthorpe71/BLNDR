import json
import requests

# URL:: https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=pineapple,%20frozen

allIngredients = [
    {
        "name": "Banana",
        "query": "Banana,%20frozen",
        "nutrition": []
    },
    {
        "name": "Pineapple",
        "query": "Pineapple,%20frozen",
        "nutrition": []
    }
    # {
    #     "name": "Strawberries",
    #     "query": "Strawberries,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Blueberries",
    #     "query": "Blueberries,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Raspberries",
    #     "query": "Raspberries,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Blackberries",
    #     "query": "Blackberries,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Cherries",
    #     "query": "Cherries,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Peaches",
    #     "query": "Peaches,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Cantaloupe",
    #     "query": "Cantaloupe,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Watermelon",
    #     "query": "Watermelon,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Pomegranate seeds",
    #     "query": "Pomegranate seeds,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Kiwi",
    #     "query": "Kiwi,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Acai",
    #     "query": "Acai,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Avocado",
    #     "query": "Avocado,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Grapes",
    #     "query": "Grapes,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Pear",
    #     "query": "Pears,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Orange",
    #     "query": "Oranges,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Apple",
    #     "query": "Apples,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Papaya",
    #     "query": "Papaya,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Mango",
    #     "query": "Mango,%20frozen",
    #     "nutrition": []
    # },
    # {
    #     "name": "Plum",
    #     "query": "Plums,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Nectarine",
    #     "query": "Nectarines,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Zucchini",
    #     "query": "Zucchini,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Cucumber",
    #     "query": "Cucumber,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Beets",
    #     "query": "Beets,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Carrot",
    #     "query": "Carrot,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Kale",
    #     "query": "Kale,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Spinach",
    #     "query": "Spinach,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Romaine",
    #     "query": "Romaine,%20raw",
    #     "nutrition": []
    # },
    # {
    #     "name": "Chocolate Protein",
    #     "query": "chocolate%20protein%20powder",
    #     "nutrition": []
    # },
    # {
    #     "name": "Pea Protein",
    #     "query": "pea%20protein%20powder",
    #     "nutrition": []
    # },
    # {
    #     "name": "Cold Coffee",
    #     "query": "black%20coffee",
    #     "nutrition": []
    # },
    # {
    #     "name": "Coconut Water",
    #     "query": "zico%20coconut%20water",
    #     "nutrition": []
    # },
    # {
    #     "name": "Almond Milk",
    #     "query": "almond%20milk",
    #     "nutrition": []
    # },
    # {
    #     "name": "Coconut Milk",
    #     "query": "coconut%20milk",
    #     "nutrition": []
    # },
    # {
    #     "name": "Oat Mil,k"
    #     "query": "oatly",
    #     "nutrition": []
    # },
    # {
    #     "name": "Whole Milk",
    #     "query": "Whole%20Milk",
    #     "nutrition": []
    # },
    # {
    #     "name": "Soy Milk",
    #     "query": "Soy%20Milk",
    #     "nutrition": []
    # },
    # {
    #     "name": "Orange Juice",
    #     "query": "Orange%20Juice",
    #     "nutrition": []
    # },
    # {
    #     "name": "Beet Juice",
    #     "query": "Beet%20juice",
    #     "nutrition": []
    # },
    # {"name": "Acai Juice": "Acai%20Juice"},
    # {
    #     "name": "Mango Juice",
    #     "query": "Mango%20Juice",
    #     "nutrition": []
    # },
    # {
    #     "name": "Carrot Juice",
    #     "query": "Carrot%20Juice",
    #     "nutrition": []
    # },
    # {
    #     "name": "Honey",
    #     "query": "Honey",
    #     "nutrition": []
    # },
    # {
    #     "name": "Dates",
    #     "query": "Medjool%20Dates",
    #     "nutrition": []
    # },
    # {
    #     "name": "Maple Syrup",
    #     "query": "Maple%20Syrup",
    #     "nutrition": []
    # },
    # {
    #     "name": "Agave",
    #     "query": "Agave",
    #     "nutrition": []
    # },
    # {
    #     "name": "Matcha",
    #     "query": "Matcha",
    #     "nutrition": []
    # },
    # {
    #     "name": "Oats",
    #     "query": "Oats",
    #     "nutrition": []
    # },
    # {
    #     "name": "Chia Seeds",
    #     "query": "Chia%20seeds",
    #     "nutrition": []
    # },
    # {
    #     "name": "Flax Seeds",
    #     "query": "Flax%20seeds",
    #     "nutrition": []
    # },
    # {
    #     "name": "Maca",
    #     "query": "Maca%20powder",
    #     "nutrition": []
    # },
    # {
    #     "name": "Hemp Seeds",
    #     "query": "Hemp%20seeds",
    #     "nutrition": []
    # },
    # {
    #     "name": "Almond Butter",
    #     "query": "Almond%20butter",
    #     "nutrition": []
    # },
    # {
    #     "name": "Peanut Butter",
    #     "query": "Peanut%20butter",
    #     "nutrition": []
    # },
    # {
    #     "name": "Cacao",
    #     "query": "Cacao",
    #     "nutrition": []
    # },
    # {
    #     "name": "Ginger",
    #     "query": "Ginger",
    #     "nutrition": []
    # },
    # {
    #     "name": "Turmeric",
    #     "query": "Turmeric",
    #     "nutrition": []
    # },
    # {
    #     "name": "Spirulina",
    #     "query": "Spirulina",
    #     "nutrition": []
    # },
    # {
    #     "name": "Basil",
    #     "query": "Basil",
    #     "nutrition": []
    # },
    # {
    #     "name": "Mint",
    #     "query": "Mint",
    #     "nutrition": []
    # },
    # {
    #     "name": "Cinnamon",
    #     "query": "Cinnamon",
    #     "nutrition": []
    # },
    # {
    #     "name": "Vanilla Extract",
    #     "query": "Vanilla%20Extract",
    #     "nutrition": []
    # },
    # {
    #     "name": "Yogurt",
    #     "query": "Yogurt",
    #     "nutrition": []
    # },
    # {
    #     "name": "Silk Tofu",
    #     "query": "Silk%20Tofu",
    #     "nutrition": []
    # },
]

result = []

for ingredient in allIngredients:
    response = requests.get(
        'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=' + ingredient.get('query'))

    # ingredient["nutrition"] = response.
    data = json.loads(response.text)
    print(data.get("foods")[0].get("foodNutrients")[0])

# for recipe in data.values():

#     if recipe.get("title") is not None:
#         if 'smoothie' in recipe.get("title").lower():
#             cleaned_ingredients = []

#             for ingredient in recipe.get("ingredients"):
#                 entry = ingredient.replace("ADVERTISEMENT", "").strip()
#                 if entry is not "":
#                     cleaned_ingredients.append(entry)

#             new_recipe = {
#                 "title": recipe.get("title"),
#                 "ingredients": cleaned_ingredients,
#                 "instructions": recipe.get("instructions"),
#                 "img_url": recipe.get("")
#             }

#             filtered_arr.append(new_recipe)

# with open('smoothie_data_cleaned_3.json', 'w') as f:
#     json.dump(filtered_arr, f, indent=2)
