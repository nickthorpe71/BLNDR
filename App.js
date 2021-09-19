import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import AsyncStorage from '@react-native-community/async-storage';

import FooterNav from './src/components/FooterNav';
import Home from './src/screens/Home';
import Filter from './src/screens/Filter';
import Results from './src/screens/Results';
import Recipe from './src/screens/Recipe';
import Favorites from './src/screens/Favorites';
import Settings from './src/screens/Settings';

import curatedRecipes from './src/data/recipesComplete.json';
import ingredients from './src/data/ingredientsWithNutrition.json';
import imageMap from './src/Utilities/imageMap.js';

const STORAGE_KEY = '@save_state';

const App = ({ history }) => {
  const [userState, setUserState] = useState({
    recipeResults: [],
    curatedRecipes: curatedRecipes.map((recipe, index) => {
      recipe.image = imageMap[recipe.img];
      recipe.id = index;
      return recipe;
    }),
    ingredients: ingredients,
    selectedRecipe: null,
    searchMain: '',
    searchCategoryFilter: [],
    searchIngredientIncludeFilter: [],
    searchIngredientExcludeFilter: [],
    searchDietaryOptionsFilter: [],
  });

  const updateState = async (key, updatedValue) => {
    const updatedState = userState;
    updatedState[key] = updatedValue;
    setUserState(updatedState);
    saveData(updatedState);
  };

  useEffect(() => {
    // clearAppData();
    readData();
  }, []);

  const clearAppData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      const jsonValue = JSON.parse(value);
      if (jsonValue != null) {
        setUserState(jsonValue);
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to fetch data from local storage: ' + e);
    }
  };

  const saveData = async data => {
    try {
      const json = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, json);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to save data to local storage: ' + e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/images/UI/LogoGroup.png')}
        style={styles.logo}
      />
      <NativeRouter>
        <Route
          exact
          path="/"
          render={props => (
            <Home {...props} updateState={updateState} userState={userState} />
          )}
        />
        <Route
          exact
          path="/filter"
          render={props => (
            <Filter
              {...props}
              updateState={updateState}
              userState={userState}
            />
          )}
        />
        <Route
          exact
          path="/results"
          render={props => (
            <Results
              {...props}
              updateState={updateState}
              userState={userState}
            />
          )}
        />
        <Route
          exact
          path="/recipe"
          render={props => (
            <Recipe
              {...props}
              updateState={updateState}
              userState={userState}
            />
          )}
        />
        <Route
          exact
          path="/favorites"
          render={props => (
            <Favorites
              {...props}
              updateState={updateState}
              userState={userState}
            />
          )}
        />
        <Route
          exact
          path="/settings"
          render={props => (
            <Settings
              {...props}
              updateState={updateState}
              userState={userState}
            />
          )}
        />
        <FooterNav goHome={() => history.push('/results')} />
      </NativeRouter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    justifyContent: 'space-between',
  },
  logo: {
    margin: 'auto',
    padding: 0,
    alignSelf: 'center',
  },
});

export default App;
