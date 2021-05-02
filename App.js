/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import Header from './src/components/Header';
import Home from './src/screens/Home';
import Filter from './src/screens/Filter';
import Results from './src/screens/Results';

// https://dev.to/nicopaulino/react-router-native-a-love-story-4m59

const App = ({ history }) => {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <Header goHome={() => history.push('/results')} />
        <Route exact path="/" component={Home} />
        <Route exact path="/filter" component={Filter} />
        {/* <Route exact path="/results" component={Results} /> */}
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
