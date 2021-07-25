import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RecipeCard from '../components/RecipeCard';
import Utils from '../utils';
import imageMap from '../imageMap';

const Home = ({ history, userState }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const featured = [];

    for (let i = 0; i < 20; i++) {
      let newRand = Utils.randNum(0, userState.curatedRecipes.length - 1);
      while (featured.includes(newRand)) {
        newRand = Utils.randNum(0, userState.curatedRecipes.length - 1);
      }
      const newFeature = userState.curatedRecipes[newRand];
      newFeature.image = imageMap[newFeature.img];

      featured.push(newFeature);
    }

    setFeaturedRecipes(featured);
  }, [userState.curatedRecipes]);

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
            source={require('../images/UI/FindRecipesCard.png')}
            style={{ width: 370, height: 370 }}
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
    fontWeight: '200',
    marginLeft: 20,
    marginTop: 15,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Home;
