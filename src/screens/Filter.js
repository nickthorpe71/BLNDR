import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SearchBar, Tab, TabView } from 'react-native-elements';

const Filter = ({ history, userState }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  const onClickTab = tabIndex => {
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
        You can include ingredients listed here, or find recipes with only these
        ingredients
      </Text>
      <View>
        <Button title="FIND RECIPE" onPress={() => history.push('/results')} />
      </View>
      <Tab value={activeTab} onChange={setActiveTab}>
        <Tab.Item title="recent" />
        <Tab.Item title="favorite" />
        <Tab.Item title="cart" />
      </Tab>
      <TabView value={activeTab} onChange={setActiveTab}>
        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>
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
