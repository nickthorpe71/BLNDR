import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RecipeCard from '../components/RecipeCard';
import Utils from '../Utilities/utils.js';

const Favorites = ({ history, userState, updateState }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const featured = [];

    for (let i = 0; i < 20; i++) {
      let newRand = Utils.randNum(0, userState.curatedRecipes.length - 1);
      while (featured.includes(newRand)) {
        newRand = Utils.randNum(0, userState.curatedRecipes.length - 1);
      }
      const newFeature = userState.curatedRecipes[newRand];

      featured.push(newFeature);
    }

    if (featured[0].title === featured[1].title) {
      featured.shift();
    }

    setFeaturedRecipes(featured);
    setFavorites(userState.curatedRecipes.filter(recipe => recipe.liked));
  }, [userState.curatedRecipes]);

  const renderCarouselItem = ({ item, index }) => {
    const cardStyle = {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      backgroundColor: 'white',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      height: 250,
      width: 155,
      marginBottom: 10,
      marginTop: 10,
      position: 'relative',
    };
    const imageStyle = {
      resizeMode: 'cover',
      width: 155,
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      flex: 3,
    };

    return (
      <RecipeCard
        history={history}
        userState={userState}
        updateState={updateState}
        recipe={item}
        cardStyle={cardStyle}
        imageStyle={imageStyle}
      />
    );
  };

  return (
    <ScrollView style={styles.favoritesContainer}>
      <View>
        <Text style={styles.favoritesTitle}>FAVORITES</Text>
        <Carousel
          layout={'default'}
          data={favorites}
          sliderWidth={400}
          itemWidth={155}
          renderItem={renderCarouselItem}
        />
      </View>
      <View>
        <Text style={styles.favoritesTitle}>RECOMMENDED</Text>
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
  favoritesContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  favoritesTitle: {
    color: '#000',
    fontSize: 26,
    fontWeight: '200',
    marginLeft: 20,
    marginTop: 10,
  },
  favoritesParagraph: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Favorites;
