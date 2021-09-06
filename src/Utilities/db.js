import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () =>
  openDatabase({ name: 'blndr.db', location: 'default' });

export const createTable = async (db, tableName) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(value TEXT NOT NULL);`;
  await db.executeSql(query);
};

export const getFromTable = async (db, tableName) => {
  try {
    const curatedRecipes = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        curatedRecipes.push(result.rows.item(i));
      }
    });
    return curatedRecipes;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get curated recipes !!!');
  }
};

export const saveRecipes = async (db, curatedRecipes, tableName) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    curatedRecipes
      .map(recipe => `(${recipe.id}, '${recipe.value}', )`)
      .join(',');

  return db.executeSql(insertQuery);
};

const exampleData = {
  title: 'Tofuberry',
  liked: false,
  Category: 'healthy',
  ingredients: [
    '1/4 cup diced silk tofu',
    '1/2 cup soy milk',
    '1/2 cup frozen raspberries',
    '1/2 cup frozen banana',
    '1 cup orange juice',
  ],
  instructions:
    'Place tofu, soy milk, yogurt, raspberries, banana, and orange juice in a blender. Blend until smooth. Pour in glasses over ice or vanilla ice cream',
  autoIngredients: [
    {
      name: 'Tofu',
      measure: 'cup',
      amount: 0.25,
    },
    {
      name: 'Soy Milk',
      measure: 'cup',
      amount: 0.5,
    },
    {
      name: 'Raspberries',
      measure: 'cup',
      amount: 0.5,
    },
    {
      name: 'Banana',
      measure: 'cup',
      amount: 0.5,
    },
    {
      name: 'Orange',
      measure: 'cup',
      amount: 1.0,
    },
  ],
  totalNutrition: {
    calories: 204.0,
    fiber: {
      measure: 'G',
      amount: 8.6,
    },
    macros: {
      protein: {
        measure: 'G',
        amount: 11.7225,
      },
      fat: {
        measure: 'G',
        amount: 4.9,
      },
      carbs: {
        measure: 'g',
        amount: 29.354999999999997,
      },
    },
    totalSugars: {
      measure: 'G',
      amount: 21.4,
    },
    vitamins: {
      A: {
        measure: 'IU',
        amount: 520.495,
      },
      C: {
        measure: 'MG',
        amount: 64.435,
      },
      D: {
        measure: 'IU',
        amount: 60.02,
      },
    },
    lipids: {
      cholesterol: {
        measure: 'MG',
        amount: 0.0,
      },
      saturated: {
        measure: 'G',
        amount: 0.6865,
      },
      trans: {
        measure: 'G',
        amount: 0.0,
      },
    },
    minerals: {
      calcium: {
        measure: 'MG',
        amount: 239.5,
      },
      iron: {
        measure: 'MG',
        amount: 2.12,
      },
      potassium: {
        measure: 'MG',
        amount: 239.5,
      },
      sodium: {
        measure: 'MG',
        amount: 73.25999999999999,
      },
    },
  },
  img: 'TofuberrySmoothie.png',
};

export const deleteTable = async (db, tableName) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
