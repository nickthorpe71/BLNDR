import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SearchBar, Switch } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const Filter = ({ history }) => {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [includeToggle, setIncludeToggle] = useState(0);
  const [carouselItems, setCarouselItems] = useState([
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
    },
  ]);

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Text style={{ fontSize: 20 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  // Search Bar Ref: https://snack.expo.io/embedded/@aboutreact/example-of-search-bar-in-react-native?preview=true&platform=ios&iframeId=qn4os3zz2g&theme=dark

  return (
    <View style={styles.filterContainerOuter}>
      <View style={styles.filterContainer}>
        <View style={styles.filterLeft}>
          <Text style={styles.filterTitle}>INGREDIENTS</Text>
          <Text style={styles.filterParagraph}>Your List</Text>
        </View>
        <View style={styles.filterRight}>
          <Text style={styles.filterParagraph}>
            You can include ingredients listed here, or find recipes with only
            these ingredients
          </Text>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            placeholder="Search"
            lightTheme={true}
            onChangeText={setSearch}
            value={search}
          />
          <Switch
            style={styles.filterSwitch}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={includeToggle ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIncludeToggle(!includeToggle)}
            value={includeToggle}
          />
          <Text style={styles.filterParagraph}>Common Ingredients</Text>
          <Carousel
            layout={'default'}
            ref={ref => (this.carousel = ref)}
            data={carouselItems}
            sliderWidth={200}
            itemWidth={110}
            renderItem={renderCarouselItem}
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
      </View>
      <View>
        <Button title="FIND RECIPE" onPress={() => history.push('/results')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainerOuter: {
    flex: 1,
    justifyContent: 'space-evenly',

  },
  filterContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 100,
    maxHeight: 420,
  },
  filterLeft: {
    flex: 2,
    borderRightWidth: 1,
  },
  filterRight: {
    flex: 3,
  },
  filterTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterParagraph: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  carouselItem: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    height: 100,
    width: 100,
    padding: 10,
  },
  filterSwitch: {
    margin: 12,
  },
});

export default Filter;
