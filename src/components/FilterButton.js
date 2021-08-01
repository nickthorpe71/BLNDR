import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const IngredientsFilter = ({ label, updateSelected, initialState }) => {
  const [active, setActive] = useState(initialState);

  const onPress = () => {
    setActive(!active);
    updateSelected(label);
  };

  return (
    <View>
      <TouchableOpacity
        style={active ? styles.active : styles.inactive}
        onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 22,
    elevation: 3,
    backgroundColor: '#9bffc1',
    marginRight: 10,
    marginBottom: 10,
  },
  inactive: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 22,
    elevation: 3,
    backgroundColor: '#eee',
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});

export default IngredientsFilter;
