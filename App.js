/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import Header from './src/components/Header';
import Home from './src/screens/Home';
import Filter from './src/screens/Filter';
import Results from './src/screens/Results';
import Recipe from './src/screens/Recipe';
import Replace from './src/screens/Replace';
import ConfirmReplace from './src/screens/ConfirmReplace';

// https://dev.to/nicopaulino/react-router-native-a-love-story-4m59

const App = ({ history }) => {
  const [userState, setUserState] = useState({
    recipeResults: [],
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
        <Header goHome={() => history.push('/results')} />
        <Route
          exact
          path="/"
          render={props => <Home {...props} updateState={updateState} />}
        />
        <Route
          exact
          path="/filter"
          render={props => <Filter {...props} updateState={updateState} />}
        />
        <Route
          exact
          path="/results"
          render={props => <Results {...props} updateState={updateState} />}
        />
        <Route
          exact
          path="/recipe"
          render={props => <Recipe {...props} updateState={updateState} />}
        />
        <Route
          exact
          path="/replace"
          render={props => <Replace {...props} updateState={updateState} />}
        />
        <Route
          exact
          path="/confirm"
          render={props => (
            <ConfirmReplace {...props} updateState={updateState} />
          )}
        />
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
