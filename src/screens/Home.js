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

const Home = ({ history, userState }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const featured = [];

    for (let i = 0; i < 10; i++) {
      let newRand = Utils.randNum(0, userState.curatedRecipes.length - 1);
      while (featured.includes(newRand)) {
        newRand = Utils.randNum(0, userState.curatedRecipes.length - 1);
      }
      featured.push(userState.curatedRecipes[newRand]);
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
