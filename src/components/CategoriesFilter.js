import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CheckBox from 'react-native-check-box';

const iconImages = {
  healthyRed: require('../images/UI/icons/Cat_icon_healthy.png'),
  healthyGreen: require('../images/UI/icons/G_cat_icon_healthy.png'),
  simpleRed: require('../images/UI/icons/Cat_icon_simple.png'),
  simpleGreen: require('../images/UI/icons/G_cat_icon_simple.png'),
  greensRed: require('../images/UI/icons/Cat_icon_green.png'),
  greensGreen: require('../images/UI/icons/G_cat_icon_green.png'),
  boosterRed: require('../images/UI/icons/Cat_icon_boost.png'),
  boosterGreen: require('../images/UI/icons/G_cat_icon_boost.png'),
  proteinRed: require('../images/UI/icons/Cat_icon_high_protein.png'),
  proteinGreen: require('../images/UI/icons/G_cat_icon_hprotein.png'),
  decadentRed: require('../images/UI/icons/Cat_icon_decadent.png'),
  decadentGreen: require('../images/UI/icons/G_cat_icon_decadent.png'),
};

const CategoriesFilter = ({ userState, updateState }) => {
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState([]);
  const [healthySelected, setHealthySelected] = useState(
    userState.searchCategoryFilter.includes('Healthy'),
  );
  const [simpleSelected, setSimpleSelected] = useState(
    userState.searchCategoryFilter.includes('Simple'),
  );
  const [greensSelected, setGreensSelected] = useState(
    userState.searchCategoryFilter.includes('Greens'),
  );
  const [boosterSelected, setBoosterSelected] = useState(
    userState.searchCategoryFilter.includes('Booster'),
  );
  const [proteinSelected, setProteinSelected] = useState(
    userState.searchCategoryFilter.includes('High Protein'),
  );
  const [decadentSelected, setDecadentSelected] = useState(
    userState.searchCategoryFilter.includes('Decadent'),
  );

  const clearSavedCategories = () => {
    setSaved(false);
    updateState('searchCategoryFilter', []);
    setSelected([]);
    setHealthySelected(false);
    setSimpleSelected(false);
    setGreensSelected(false);
    setBoosterSelected(false);
    setProteinSelected(false);
    setDecadentSelected(false);
  };

  const updateSelected = category => {
    setSaved(false);
    const newSelected = selected;
    let newButtonState = false;

    if (!newSelected.includes(category)) {
      newSelected.push(category);
      setSelected(newSelected);
      newButtonState = true;
    } else {
      const index = newSelected.indexOf(category);
      if (index > -1) {
        newSelected.splice(index, 1);
      }
    }

    updateState('searchCategoryFilter', newSelected);

    switch (category) {
      case 'Healthy':
        setHealthySelected(newButtonState);
        break;
      case 'Simple':
        setSimpleSelected(newButtonState);
        break;
      case 'Greens':
        setGreensSelected(newButtonState);
        break;
      case 'Booster':
        setBoosterSelected(newButtonState);
        break;
      case 'High Protein':
        setProteinSelected(newButtonState);
        break;
      case 'Decadent':
        setDecadentSelected(newButtonState);
        break;

      default:
        break;
    }
  };

  const renderCategoryButton = (
    title,
    subtext,
    image,
    styleBool,
    width,
    height,
  ) => {
    return (
      <TouchableOpacity
        style={
          styleBool
            ? styles.categoryButtonActive
            : styles.categoryButtonInactive
        }
        onPress={() => updateSelected(title)}>
        <Image
          source={image}
          style={{ width: width, height: height, marginHorizontal: 10 }}
        />
        <View>
          <Text style={styles.categoryButtonText}>{title}</Text>
          <Text style={styles.categoryButtonSubtext}>{subtext}</Text>
        </View>
      </TouchableOpacity>
    );
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
          onPress={clearSavedCategories}>
          <Text style={styles.clearButtonText}>{'Clear All'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <View>
          {renderCategoryButton(
            'Healthy',
            'Smoothies with under 200 calories',
            healthySelected ? iconImages.healthyGreen : iconImages.healthyRed,
            healthySelected,
            40,
            31,
          )}
          {renderCategoryButton(
            'Greens',
            'Smoothies with mostly green ingredients',
            greensSelected ? iconImages.greensGreen : iconImages.greensRed,
            greensSelected,
            40,
            38,
          )}
          {renderCategoryButton(
            'High Protein',
            'Smoothies with 20+ grams of protein',
            proteinSelected ? iconImages.proteinGreen : iconImages.proteinRed,
            proteinSelected,
            40,
            44,
          )}
        </View>
        <View>
          {renderCategoryButton(
            'Simple',
            'Easy to make, 5 ingredients or less',
            simpleSelected ? iconImages.simpleGreen : iconImages.simpleRed,
            simpleSelected,
            35,
            46,
          )}
          {renderCategoryButton(
            'Booster',
            'Smoothies that support energy boost',
            boosterSelected ? iconImages.boosterGreen : iconImages.boosterRed,
            boosterSelected,
            26,
            45,
          )}
          {renderCategoryButton(
            'Decadent',
            'Taste first, nutrition second',
            decadentSelected
              ? iconImages.decadentGreen
              : iconImages.decadentRed,
            decadentSelected,
            40,
            38,
          )}
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
    // alignItems: 'center',
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
  categoryButtonActive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#aaa',
    width: 172,
    height: 90,
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 10,
    // shadow
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  categoryButtonInactive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#eee',
    width: 172,
    height: 90,
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 10,
    // shadow
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  categoryButtonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  categoryButtonSubtext: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: '200',
    letterSpacing: 0.01,
    color: 'black',
    width: 110,
  },
});

export default CategoriesFilter;
