/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Blendr</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 45,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Header;
