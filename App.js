/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import Header from './src/components/Header';
import Home from './src/screens/Home';
import Filter from './src/screens/Filter';

// https://dev.to/nicopaulino/react-router-native-a-love-story-4m59

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/filter" component={Filter} />
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
