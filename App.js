import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import Header from './src/components/Header';
import Home from './src/screens/Home';
import Filter from './src/screens/Filter';
import Results from './src/screens/Results';
import Recipe from './src/screens/Recipe';

import curatedRecipes from './src/data/recipesComplete.json';

const App = ({ history }) => {
  const [userState, setUserState] = useState({
    recipeResults: null,
    curatedRecipes: curatedRecipes,
    selectedRecipe: null,
  });

  const updateState = {
    setRecipeResults: updatedRecipes => {
      const updatedState = userState;
      updatedState.recipeResults = updatedRecipes;
      setUserState(updatedState);
    },
  };

  return (
    <View style={styles.container}>
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
        <Header goHome={() => history.push('/results')} />
      </NativeRouter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
});

export default App;
