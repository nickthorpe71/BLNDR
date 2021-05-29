const allRecipes = require('./selectedRecipes.json');

/**
 * parses a string to remove numbers, puncuation, all measurement types.
 * @param {String} `ingredient`
 * @return {String} `washedIngredient`
 */
const washIngredient = ingredient => {
  let washedIngredient = ingredient.replace(/[^A-za-z\s]/g, '').toLowerCase();

  const measurements = [
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
  ];

  // add plurals
  measurements.forEach(measurement => {
    measurements.push(measurement + 's');
  });

  const expStr = measurements.join('|');
  washedIngredient = washedIngredient
    .replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ')
    .replace(/\s{2,}/g, ' ');

  return washedIngredient.trim();
};

const getIngredients = () => {
  let ingredientSet = new Set();

  allRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      ingredientSet.add(washIngredient(ingredient));
    });
  });

  return ingredientSet;
};

const washIngredients = () => {
  console.log(getIngredients());
};

washIngredients();

module.exports = washIngredients;

// appricot
// lowfat yogurt ****
// kosher salt
// granulated sugar
// vanilla bean pulp
// fusion boosters ginseng bee pollen multivitimin ginko biloba lecithin andor soy protein
// plain nonfat frozen yogurt
// honeydew melon ****
// nonfat milk
// cranberry or grape juice or any deep redpurple juice
// head red cabbage
// strawberry jam
// kefir cultured milk product available specialty health food stores
// granola for garnish
// fresh lemon juice
// heavy cream to lighten up substitute water
// juice of limes
// sweetened condensed milk plus more to taste
// dash ground nutmeg
// chilled triplestrength green tea
// unsweetened coconut flakes
// frozen collard greens
// ground allspice
// broccoli florets optional
// cashews
// graham cracker crumbs

// appricot
// lowfat yogurt **
// kosher salt
// granulated sugar
// vanilla bean pulp
// ginseng
// bee pollen
// multivitimin
// ginko biloba
// plain nonfat frozen yogurt
// honeydew melon **
// nonfat milk
// cranberry juice
// grape juice
// red cabbage
// strawberry jam
// kefir cultured milk product
// granola
// fresh lemon juice **
// heavy cream
// lime juice
// sweetened condensed milk
// dash ground nutmeg
// chilled green tea
// unsweetened coconut flakes
// frozen collard greens
// ground allspice
// broccoli florets
// cashews
// graham cracker crumbs