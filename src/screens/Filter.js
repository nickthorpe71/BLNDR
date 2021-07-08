import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Tab from '../components/Tab';

const Filter = ({ history, userState, children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  const onClickTab = tab => {
    setActiveTab(tab);
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
      <div style={styles.tabs}>
        <ol>
          {children.map(child => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTab}
              />
            );
          })}
        </ol>
        <div style={styles.tabContent}>
          {children.map(child => {
            if (child.props.label !== activeTab) {
              return undefined;
            }
            return child.props.children;
          })}
        </div>
      </div>
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
    borderBottom: '1px solid #ccc',
    paddingLeft: 0,
  },
});

export default Filter;
