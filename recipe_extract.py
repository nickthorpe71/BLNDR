import json
import requests

# URL:: https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=pineapple,%20frozen

allIngredients = [
    {
        "name": "Orange Juice",
        "query": "Orange%20Juice",
        "nutrition": []
    },
    {
        "name": "Beet Juice",
        "query": "Beet%20juice",
        "nutrition": []
    },
    {
        "name": "Acai Juice",
        "query": "Acai%20Juice"
    },
    {
        "name": "Mango Juice",
        "query": "Mango%20Juice",
        "nutrition": []
    },
    {
        "name": "Carrot Juice",
        "query": "Carrot%20Juice",
        "nutrition": []
    },
    {
        "name": "Honey",
        "query": "Honey",
        "nutrition": []
    },
    {
        "name": "Dates",
        "query": "Medjool%20Dates",
        "nutrition": []
    },
    {
        "name": "Maple Syrup",
        "query": "Maple%20Syrup",
        "nutrition": []
    },
    {
        "name": "Agave",
        "query": "Agave",
        "nutrition": []
    },
    {
        "name": "Matcha",
        "query": "Matcha%20powder",
        "nutrition": []
    },
    {
        "name": "Oats",
        "query": "Oats%20old%20fashioned",
        "nutrition": []
    },
    {
        "name": "Chia Seeds",
        "query": "Chia%20seeds",
        "nutrition": []
    },
    {
        "name": "Flax Seeds",
        "query": "Flax%20seeds",
        "nutrition": []
    },
    {
        "name": "Maca",
        "query": "Maca%20powder",
        "nutrition": []
    },
    {
        "name": "Hemp Seeds",
        "query": "Hemp%20seeds",
        "nutrition": []
    },
    {
        "name": "Almond Butter",
        "query": "Almond%20butter",
        "nutrition": []
    },
    {
        "name": "Peanut Butter",
        "query": "Peanut%20butter",
        "nutrition": []
    },
    {
        "name": "Cacao",
        "query": "Cacao",
        "nutrition": []
    },
    {
        "name": "Ginger",
        "query": "Ginger",
        "nutrition": []
    },
    {
        "name": "Turmeric",
        "query": "Turmeric",
        "nutrition": []
    },
    {
        "name": "Spirulina",
        "query": "Spirulina",
        "nutrition": []
    },
    {
        "name": "Basil",
        "query": "Basil",
        "nutrition": []
    },
    {
        "name": "Mint",
        "query": "Mint",
        "nutrition": []
    },
    {
        "name": "Cinnamon",
        "query": "Cinnamon",
        "nutrition": []
    },
    {
        "name": "Vanilla Extract",
        "query": "Vanilla%20Extract",
        "nutrition": []
    },
    {
        "name": "Yogurt",
        "query": "Yogurt",
        "nutrition": []
    },
    {
        "name": "Silk Tofu",
        "query": "Silk%20Tofu",
        "nutrition": []
    },
]

result = []

for ingredient in allIngredients:
    response = requests.get(
        'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY=' + ingredient.get('query'))

    nutritionObj = {
        "measure": None,
        "amount": 1,
        "calories": None,
        "fiber": {
            "measure": "g",
            "amount": None
        },
        "macros": {
            "protein": {
                "measure": "g",
                "amount": None
            },
            "fat": {
                "measure": "g",
                "amount": None
            },
            "carbs": {
                "measure": "g",
                "amount": None
            }
        },
        "totalSugars": {
            "measure": "g",
            "amount": None
        },
        "vitamins": {
            "A": {
                "measure": "IU",
                "amount": None
            },
            "C": {
                "measure": "mg",
                "amount": None
            },
            "D": {
                "measure": "IU",
                "amount": None
            }
        },
        "lipids": {
            "cholesterol": {
                "measure": "g",
                "amount": None
            },
            "saturated": {
                "measure": "g",
                "amount": None
            },
            "trans": {
                "measure": "g",
                "amount": None
            }
        },
        "minerals": {
            "calcium": {
                "measure": "mg",
                "amount": None
            },
            "iron": {
                "measure": "mg",
                "amount": None
            },
            "potassium": {
                "measure": "mg",
                "amount": None
            },
            "sodium": {
                "measure": "mg",
                "amount": None
            }
        }
    }

    selected = json.loads(response.text).get("foods")[0]

    response2 = requests.get(
        'https://api.nal.usda.gov/fdc/v1/food/' + str(selected["fdcId"]) + '?api_key=DEMO_KEY')

    expandedInfo = json.loads(response2.text)

    measure = None
    amount = 1

    if "servingSizeUnit" in expandedInfo and "servingSize" in expandedInfo:
        measure = expandedInfo["servingSizeUnit"]
        amount = expandedInfo["servingSize"]

    def addProtein(nutrient):
        nutritionObj["macros"]["protein"]["measure"] = nutrient["unitName"]
        nutritionObj["macros"]["protein"]["amount"] = nutrient["value"]

    def addFat(nutrient):
        nutritionObj["macros"]["fat"]["measure"] = nutrient["unitName"]
        nutritionObj["macros"]["carbs"]["amount"] = nutrient["value"]

    def addCarbs(nutrient):
        nutritionObj["macros"]["protein"]["measure"] = nutrient["unitName"]
        nutritionObj["macros"]["protein"]["amount"] = nutrient["value"]

    def addCals(nutrient):
        nutritionObj["calories"] = nutrient["value"]

    def addSugar(nutrient):
        nutritionObj["totalSugars"]["measure"] = nutrient["unitName"]
        nutritionObj["totalSugars"]["amount"] = nutrient["value"]

    def addFiber(nutrient):
        nutritionObj["fiber"]["measure"] = nutrient["unitName"]
        nutritionObj["fiber"]["amount"] = nutrient["value"]

    def addCalcium(nutrient):
        nutritionObj["minerals"]["calcium"]["measure"] = nutrient["unitName"]
        nutritionObj["minerals"]["calcium"]["amount"] = nutrient["value"]

    def addIron(nutrient):
        nutritionObj["minerals"]["iron"]["measure"] = nutrient["unitName"]
        nutritionObj["minerals"]["iron"]["amount"] = nutrient["value"]

    def addPotassium(nutrient):
        nutritionObj["minerals"]["potassium"]["measure"] = nutrient["unitName"]
        nutritionObj["minerals"]["potassium"]["amount"] = nutrient["value"]

    def addSodium(nutrient):
        nutritionObj["minerals"]["sodium"]["measure"] = nutrient["unitName"]
        nutritionObj["minerals"]["sodium"]["amount"] = nutrient["value"]

    def addCholesterol(nutrient):
        nutritionObj["lipids"]["cholesterol"]["measure"] = nutrient["unitName"]
        nutritionObj["lipids"]["cholesterol"]["amount"] = nutrient["value"]

    def addSaturated(nutrient):
        nutritionObj["lipids"]["saturated"]["measure"] = nutrient["unitName"]
        nutritionObj["lipids"]["saturated"]["amount"] = nutrient["value"]

    def addTrans(nutrient):
        nutritionObj["lipids"]["trans"]["measure"] = nutrient["unitName"]
        nutritionObj["lipids"]["trans"]["amount"] = nutrient["value"]

    def addA(nutrient):
        nutritionObj["vitamins"]["A"]["measure"] = nutrient["unitName"]
        nutritionObj["vitamins"]["A"]["amount"] = nutrient["value"]

    def addD(nutrient):
        nutritionObj["vitamins"]["D"]["measure"] = nutrient["unitName"]
        nutritionObj["vitamins"]["D"]["amount"] = nutrient["value"]

    def addC(nutrient):
        nutritionObj["vitamins"]["C"]["measure"] = nutrient["unitName"]
        nutritionObj["vitamins"]["C"]["amount"] = nutrient["value"]

    switcher = {
        1003: addProtein,
        1004: addFat,
        1005: addCarbs,
        1008: addCals,
        2000: addSugar,
        1079: addFiber,
        1087: addCalcium,
        1089: addIron,
        1092: addPotassium,
        1093: addSodium,
        1253: addCholesterol,
        1258: addSaturated,
        1257: addTrans,
        1104: addA,
        1110: addD,
        1162: addC,
    }

    for nutrient in selected["foodNutrients"]:
        if nutrient.get("nutrientId") in switcher:
            addFunction = switcher.get(nutrient.get("nutrientId"))
            addFunction(nutrient)

    ingredient["nutrition"] = nutritionObj
    ingredient["nutrition"]["measure"] = measure
    ingredient["nutrition"]["amount"] = amount

    print(ingredient.get("name") + 'complete')

with open('bulkIngredients.json', 'w') as f:
    json.dump(allIngredients, f, indent=2)
