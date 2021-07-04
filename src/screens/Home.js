import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RecipeCard from '../components/RecipeCard';

const Home = ({ history, userState }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([
    {
      title: 'Item 1',
      numIngredients: 'Text 1',
      calories: 'Text 1',
      protein: 'Text 1',
    },
    {
      title: 'Item 2',
      numIngredients: 'Text 2',
      calories: 'Text 2',
      protein: 'Text 2',
    },
    {
      title: 'Item 3',
      numIngredients: 'Text 3',
      calories: 'Text 3',
      protein: 'Text 3',
    },
    {
      title: 'Item 4',
      numIngredients: 'Text 4',
      calories: 'Text 4',
      protein: 'Text 4',
    },
    {
      title: 'Item 5',
      numIngredients: 'Text 5',
      calories: 'Text 5',
      protein: 'Text 5',
    },
  ]);

  const renderCarouselItem = ({ item, index }) => {
    return <RecipeCard history={history} userState={userState} recipe={item} />;
  };

  return (
    <ScrollView style={styles.homeContainer}>
      <View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => history.push('/filter')}>
          <Image
            style={{ width: 280, height: 280 }}
            source={{
              uri:
                'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/frozen-fruit-smoothie-3.jpg',
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.homeTitle}>FEATURED</Text>
        <Carousel
          layout={'default'}
          data={featuredRecipes}
          sliderWidth={400}
          itemWidth={155}
          renderItem={renderCarouselItem}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#fff',
    flex: 1,
    // justifyContent: 'space-evenly',
  },
  homeTitle: {
    color: '#000',
    fontSize: 26,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  homeParagraph: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Home;
