import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import CheckBox from 'react-native-check-box';

const IngredientsFilter = ({ userState, updateState }) => {
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState([]);

  const clearSavedIngredients = () => {
    setSaved(false);
    updateState('searchCategoryFilter', []);
    setSelected([]);
  };

  const updateSelected = category => {
    setSaved(false);
    const newSelected = selected;
    let newButtonState = false;

    if (!newSelected.includes(category)) {
      newSelected.push(category);
      setSelected(newSelected);
      updateState('searchCategoryFilter', newSelected);
      newButtonState = true;
    } else {
      const index = newSelected.indexOf(category);
      if (index > -1) {
        newSelected.splice(index, 1);
      }
    }
  };

  // each ingredient button will need its own state for selected or not

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Select categories you want to include in your search</Text>
      </View>
      <View style={styles.mid}>
        <CheckBox
          style={styles.checkbox}
          onClick={() => setSaved(!saved)}
          isChecked={saved}
          rightText={'Save Selection'}
        />
        <Pressable style={styles.clearButton} onPress={clearSavedIngredients}>
          <Text style={styles.clearButtonText}>{'Clear All'}</Text>
        </Pressable>
      </View>
      <View style={styles.bottom}>
        <View>
          <Text>temp</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    height: '100%',
  },
  top: {
    flex: 1,
  },
  mid: {
    flex: 1,
    flexDirection: 'row',
  },
  checkbox: {
    flex: 1,
    padding: 0,
  },
  clearButton: {
    alignItems: 'flex-end',
    paddingTop: 4,
    marginRight: 15,
    backgroundColor: '#fff',
    width: 160,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'black',
  },
  bottom: {
    flex: 8,
    flexDirection: 'row',
  },
});

export default IngredientsFilter;
