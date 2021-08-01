import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import FooterNav from './src/components/FooterNav';
import Home from './src/screens/Home';
import Filter from './src/screens/Filter';
import Results from './src/screens/Results';
import Recipe from './src/screens/Recipe';

import curatedRecipes from './src/data/recipesComplete.json';
import ingredients from './src/data/ingredientsWithNutrition.json';

const App = ({ history }) => {
  const [userState, setUserState] = useState({
    recipeResults: null,
    curatedRecipes: curatedRecipes,
    ingredients: ingredients,
    selectedRecipe: null,
    searchMain: '',
    searchCategoryFilter: [],
    searchIngredientIncludeFilter: [],
    searchIngredientExcludeFilter: [],
    searchDietaryOptionsFilter: [],
  });

  const updateState = (key, updatedValue) => {
    const updatedState = userState;
    updatedState[key] = updatedValue;
    setUserState(updatedState);
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
