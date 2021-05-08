import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Results = ({ history }) => {
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
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => history.push('/recipe')}>
        <Image
          style={{ width: 80, height: 130 }}
          source={{
            uri:
              'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/frozen-fruit-smoothie-3.jpg',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.resultsContainer}>
      <View>
        <Text style={styles.resultsTitle}>RESULTS</Text>
        <Text style={styles.resultsParagraph}>
          Here's what we found for you
        </Text>
      </View>
      <View>
        <Text style={styles.resultsSubTitle}>Category</Text>
        <Carousel
          containerCustomStyle={styles.carousel}
          layout={'default'}
          enableSnap={true}
          ref={ref => (this.carousel = ref)}
          data={carouselItems}
          sliderWidth={400}
          itemWidth={110}
          renderItem={renderCarouselItem}
          onSnapToItem={index => setActiveIndex(index)}
        />
        <Text style={styles.resultsSubTitle}>Category</Text>
        <Carousel
          containerCustomStyle={styles.carousel}
          layout={'default'}
          enableSnap={true}
          ref={ref => (this.carousel = ref)}
          data={carouselItems}
          sliderWidth={400}
          itemWidth={110}
          renderItem={renderCarouselItem}
          onSnapToItem={index => setActiveIndex(index)}
        />
        <Text style={styles.resultsSubTitle}>Category</Text>
        <Carousel
          containerCustomStyle={styles.carousel}
          layout={'default'}
          enableSnap={true}
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
  resultsContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  resultsTitle: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  resultsSubTitle: {
    color: '#000',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },
  resultsParagraph: {
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
    height: 150,
    width: 100,
    padding: 10,
  },
  carousel: {
    marginBottom: 10,
  },
});

export default Results;
