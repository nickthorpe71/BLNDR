import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Home = ({ history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <View style={styles.homeContainer}>
      <View>
        <Text style={styles.homeTitle}>GET BLENDING</Text>
        <Text style={styles.homeParagraph}>
          Select ingredients, restrictions and more to find the perfect recipe
          for you
        </Text>
        <Button title="START SEARCH" onPress={() => history.push('/filter')} />
      </View>
      <View>
        <Text style={styles.homeTitle}>FEATURED</Text>
        <Text style={styles.homeParagraph}>
          Get inspired by some of our top picks for you
        </Text>
        <Carousel
          layout={'default'}
          ref={ref => (this.carousel = ref)}
          data={carouselItems}
          sliderWidth={400}
          itemWidth={110}
          renderItem={renderCarouselItem}
          onSnapToItem={index => setActiveIndex(index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  homeTitle: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  homeParagraph: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  carouselItem: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    height: 100,
    width: 100,
    padding: 10,
  },
});

export default Home;
