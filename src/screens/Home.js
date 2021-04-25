import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.text}>Blendr</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: 'darkslateblue',
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Home;
