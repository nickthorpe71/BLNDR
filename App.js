/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Header from './src/components/Header';
import ListItem from './src/components/ListItem';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [items, setItems] = useState([
    { id: uuidv4(), text: 'Nuts' },
    { id: uuidv4(), text: 'Berries' },
    { id: uuidv4(), text: 'Beer' },
    { id: uuidv4(), text: 'Bread' },
  ]);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={items}
        renderItem={({ item }) => <ListItem item={item} />}
      />
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
