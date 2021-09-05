import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

// const tableName = 'curatedRecipes';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'blndr.db', location: 'default' });
};

export const createTable = async (db, tableName) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getCuratedRecipes = async (db, tableName) => {
  try {
    const todoItems = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        todoItems.push(result.rows.item(i));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get curated recipes !!!');
  }
};

export const saveCuratedRecipes = async (db, curatedRecipes, tableName) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    curatedRecipes.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteRecipe = async (db, id, tableName) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db, tableName) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
