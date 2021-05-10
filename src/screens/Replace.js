import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SearchBar, Switch } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const Replace = ({ history }) => {
  return (
    <View style={styles.replaceContainerOuter}>
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  replaceContainerOuter: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  replaceContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 100,
    maxHeight: 420,
  },
});

export default Replace;
