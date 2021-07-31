import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import CategoriesFilter from '../components/CategoriesFilter';

const Filter = ({ history, userState, updateState }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  const onClickTab = tabIndex => {
    setActiveTab(tabIndex);
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
        />
        <Text style={styles.textBelowSearch}>
          Use the search bar to find recipes or use the sections below to filter
          your search.
        </Text>
      </View>
      <View style={styles.mid}>
        <Pressable
          style={styles.searchButton}
          onPress={() => history.push('/results')}>
          <Text style={styles.searchButtonText}>{'Search Recipes'}</Text>
        </Pressable>
        <Pressable
          style={styles.clearButton}
          onPress={() => history.push('/results')}>
          <Text style={styles.clearButtonText}>{'Clear All Selections'}</Text>
        </Pressable>
      </View>
      <View style={styles.bottom}>
        <View style={styles.tabContainer}>
          <Pressable
            style={
              activeTab === 0 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(0)}>
            <Text style={styles.tabButtonText}>{'CATEGORIES'}</Text>
          </Pressable>
          <Pressable
            style={
              activeTab === 1 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(1)}>
            <Text style={styles.tabButtonText}>{'INGREDIENTS'}</Text>
          </Pressable>
          <Pressable
            style={
              activeTab === 2 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(2)}>
            <Text style={styles.tabButtonText}>{'DIETARY OPTIONS'}</Text>
          </Pressable>
          <Pressable
            style={
              activeTab === 3 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => onClickTab(3)}>
            <Text style={styles.tabButtonText}>{'RESTRICTIONS'}</Text>
          </Pressable>
        </View>
        <View>
          {/* <Text>{activeTab}</Text> */}
          {activeTab === 0 && (
            <CategoriesFilter userState={userState} updateState={updateState} />
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
