import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SearchBar, Tab, TabView } from 'react-native-elements';

const Filter = ({ history, userState }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  const onClickTab = (event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <View style={styles.filterContainer}>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        placeholder="Search"
        lightTheme={true}
      />
      <Text style={styles.filterParagraph}>
        Use the search bar to find recipes or use the sections below to filter
        your search.
      </Text>
      <View>
        <Button title="FIND RECIPE" onPress={() => history.push('/results')} />
      </View>
      <View>
        <Button title="CATEGORIES" onPress={() => onClickTab(0)} />
        <Button title="INGREDIENTS" onPress={() => onClickTab(1)} />
        <Button title="DIETARY OPTIONS" onPress={() => onClickTab(2)} />
        <Button title="RESTRICTIONS" onPress={() => onClickTab(3)} />
      </View>
      <View>
        <Text>{activeTab}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 30,
  },
  tabs: {
    margin: 1,
  },
  tabContent: {
    paddingLeft: 0,
  },
});

export default Filter;
