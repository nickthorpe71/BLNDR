import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import FilterButton from '../components/FilterButton';

const DietaryFilter = ({ forceRemount, userState, updateState }) => {
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState([]);

  const clearSavedIngredients = () => {
    setSaved(false);
    updateState('searchDietaryOptionsFilter', []);
    setSelected([]);
    forceRemount();
  };

  const updateSelected = ingredient => {
    setSaved(false);
    const newSelected = selected;

    if (!newSelected.includes(ingredient)) {
      newSelected.push(ingredient);
      setSelected(newSelected);
    } else {
      const index = newSelected.indexOf(ingredient);
      if (index > -1) {
        newSelected.splice(index, 1);
      }
    }

    updateState('searchDietaryOptionsFilter', newSelected);
  };

  const renderDietary = () => {
    const options = [
      'Vegan',
      'Vegetarian',
      'Gluten Free',
      'Keto',
      'Whole30',
      'Paleo',
    ];

    return options.map(option => {
      return (
        <FilterButton
          key={option}
          initialState={userState.searchDietaryOptionsFilter.includes(option)}
          label={option}
          updateSelected={updateSelected}
        />
      );
    });
  };

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
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearSavedIngredients}>
          <Text style={styles.clearButtonText}>{'Clear All'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <ScrollView style={styles.scroll}>
          <View style={styles.buttonOuterLayout}>{renderDietary()}</View>
        </ScrollView>
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
    height: 40,
  },
  mid: {
    height: 30,
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
  sectionHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  buttonOuterLayout: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});

export default DietaryFilter;
