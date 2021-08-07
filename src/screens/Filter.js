import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import CategoriesFilter from '../components/CategoriesFilter';
import IngredientsFilter from '../components/IngredientsFilter';
import DietaryFilter from '../components/DietaryFilter';

const Filter = props => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabKey1, setTabKey1] = useState(0);
  const [tabKey2, setTabKey2] = useState(1);
  const [tabKey3, setTabKey3] = useState(2);
  const [tabKey4, setTabKey4] = useState(3);
  const [searchText, updateSearchText] = useState('');
  const { history, userState, updateState } = props;

  const onClickTab = tabIndex => {
    setActiveTab(tabIndex);
  };

  const wipeSearch = () => {
    updateState('searchMain', '');
    updateState('searchCategoryFilter', []);
    updateState('searchIngredientIncludeFilter', []);
    updateState('searchIngredientExcludeFilter', []);
    updateState('searchDietaryOptionsFilter', []);
    updateState('recipeResults', []);

    setTabKey1(tabKey1 + 1);
    setTabKey2(tabKey2 + 1);
    setTabKey3(tabKey3 + 1);
    setTabKey4(tabKey4 + 1);
  };

  const submitSearch = () => {
    updateState('searchMain', searchText);
    updateState('recipeResults', [
      ...filteredBySearchText(),
      ...filteredByCategory(),
    ]);

    // has category as tag add
    // include
    // check how many ingredients that are selected this includes
    // if  > 70% add
    // if has the dietary option add
    // loop through results and any that include ingredients in exclude remove

    history.push('/results');
  };

  const filteredBySearchText = () => {
    if (searchText === '') {
      return [];
    }
    // check recipe titles for searchText
    const searchTextTitleResult = userState.curatedRecipes.filter(recipe =>
      recipe.title.includes(searchText),
    );
    // check recipe ingredients for searchText
    const searchTextIngredientsResult = userState.curatedRecipes.filter(
      recipe => {
        let hasString = false;
        recipe.autoIngredients.forEach(ingredient => {
          if (ingredient.name.includes(searchText)) {
            hasString = true;
          }
        });
        return hasString;
      },
    );

    return [...searchTextTitleResult, ...searchTextIngredientsResult];
  };

  const filteredByCategory = () => {
    const matchClearance = 0.7;
    let results = [];
    userState.curatedRecipes.forEach(recipe => {
      let match = 0;
      switch (userState.searchCategoryFilter) {
        case 'Healthy':
          console.log('test');
          if (recipe.Category.toLower() === 'healthy') {
            results.push(recipe);
            break;
          }
          match =
            numIngredientsWithTag(recipe, 'healthy') /
            recipe.autoIngredients.length;
          if (match >= matchClearance) {
            results.push(recipe);
            break;
          }
          break;
        case 'Simple':
          if (recipe.autoIngredients.length <= 5) {
            results.push(recipe);
            break;
          }
          break;
        case 'Greens':
          const tagsToSearch = [
            'greens',
            'healthy',
            'super healthy',
            'veggie',
            'veggies',
          ];
          tagsToSearch.forEach(tag => {
            match =
              numIngredientsWithTag(recipe, tag) /
              recipe.autoIngredients.length;
            if (match >= matchClearance) {
              results.push(recipe);
            }
          });
          break;
        case 'Booster':
          match =
            numIngredientsWithTag(recipe, 'booster') /
            recipe.autoIngredients.length;
          if (match > 0) {
            results.push(recipe);
          }
          break;
        case 'High Protein':
          if (Math.round(recipe.totalNutrition.macros.protein.amount) >= 20) {
            results.push(recipe);
          }
          break;
        case 'Decadent':
          if (recipe.Category.toLower() === 'decadent') {
            results.push(recipe);
            break;
          }
          match =
            numIngredientsWithTag(recipe, 'decadent') /
            recipe.autoIngredients.length;
          if (match >= matchClearance) {
            results.push(recipe);
            break;
          }
          break;

        default:
          break;
      }
    });
    return results;
  };

  const numIngredientsWithTag = (recipe, tag) => {
    let withTag = 0;
    recipe.autoIngredients.forEach(autoIngredient => {
      userState.ingredients.forEach(ingredient => {
        if (ingredient.name === autoIngredient.name) {
          if (ingredient.tags.includes(tag)) {
            withTag++;
          }
        }
      });
    });
    return withTag;
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.top}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          placeholder="Search"
          inputStyle={styles.greyBG}
          inputContainerStyle={styles.greyBG}
          containerStyle={styles.searchContainerStyle}
          placeholderTextColor={'#g5g5g5'}
          onChangeText={updateSearchText}
          value={searchText}
        />
        <Text style={styles.textBelowSearch}>
          Use the search bar to find recipes or use the sections below to filter
          your search.
        </Text>
      </View>
      <View style={styles.mid}>
        <TouchableOpacity style={styles.searchButton} onPress={submitSearch}>
          <Text style={styles.searchButtonText}>{'Search Recipes'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={wipeSearch}>
          <Text style={styles.clearButtonText}>{'Clear All Selections'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={
              activeTab === 0 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(0)}>
            <Text style={styles.tabButtonText}>{'CATEGORIES'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 1 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(1)}>
            <Text style={styles.tabButtonText}>{'INGREDIENTS'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 2 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(2)}>
            <Text style={styles.tabButtonText}>{'DIETARY OPTIONS'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 3 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(3)}>
            <Text style={styles.tabButtonText}>{'RESTRICTIONS'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* <Text>{activeTab}</Text> */}
          {activeTab === 0 && (
            <CategoriesFilter
              forceRemount={() => setTabKey1(tabKey1 + 1)}
              key={tabKey1}
              userState={userState}
              updateState={updateState}
            />
          )}
          {activeTab === 1 && (
            <IngredientsFilter
              key={tabKey2}
              {...props}
              stateKey={'searchIngredientIncludeFilter'}
              forceRemount={() => setTabKey2(tabKey2 + 1)}
              userState={userState}
              updateState={updateState}
            />
          )}
          {activeTab === 2 && (
            <DietaryFilter
              {...props}
              forceRemount={() => setTabKey3(tabKey3 + 1)}
              key={tabKey3}
              userState={userState}
              updateState={updateState}
            />
          )}
          {activeTab === 3 && (
            <IngredientsFilter
              key={tabKey4}
              {...props}
              stateKey={'searchIngredientExcludeFilter'}
              forceRemount={() => setTabKey4(tabKey4 + 1)}
              userState={userState}
              updateState={updateState}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '80%',
  },
  searchContainerStyle: {
    backgroundColor: 'white',
    padding: 0,
    borderBottomColor: 'white',
    borderTopColor: 'white',
  },
  greyBG: {
    backgroundColor: '#efefef',
  },
  textBelowSearch: {
    paddingTop: 10,
    fontSize: 12,
  },
  top: {
    flex: 1,
    paddingHorizontal: 15,
  },
  mid: {
    flex: 1,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom: {
    flex: 5,
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fb5636',
    width: 160,
    height: 45,
  },
  searchButtonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingTop: 30,
    backgroundColor: '#fff',
    width: 160,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'black',
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingHorizontal: 5,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    flex: 1,
    height: 50,
  },
  tabButtonSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    flex: 1,
    borderBottomColor: '#fb5636',
    borderWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  tabButtonText: {
    fontSize: 10,
    color: 'black',
  },
  tabContent: {
    paddingLeft: 0,
  },
});

export default Filter;
