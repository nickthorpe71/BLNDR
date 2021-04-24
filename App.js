/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/Header';
import { uuid } from 'uuidv4';

const App = () => {
  const [items, setItems] = useState([
    { id: uuid(), text: 'Nuts' },
    { id: uuid(), text: 'Berries' },
    { id: uuid(), text: 'Beer' },
    { id: uuid(), text: 'Bread' },
  ]);

  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
