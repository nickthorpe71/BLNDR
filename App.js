/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Header from './src/components/Header';
import ListItem from './src/components/ListItem';
import Home from './src/screens/Home';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Home />
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
