import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const RecipeCard = ({ history, userState, recipe }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.card}
      onPress={() => history.push('/recipe')}>
      <Image
        style={styles.image}
        source={{
          uri:
            'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/frozen-fruit-smoothie-3.jpg',
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
      </View>
      <View style={styles.nutritionFloat}>
        <View style={styles.nutritionFloatLeft}>
          <Text style={styles.whiteTitle}>
            {Math.round(recipe.totalNutrition.calories)}
          </Text>
          <Text style={styles.whiteSubtitle}>Cals.</Text>
        </View>
        <View style={styles.whiteDivide} />
        <View style={styles.nutritionFloatRight}>
          <Text style={styles.whiteTitle}>
            {Math.round(recipe.totalNutrition.macros.protein.amount)}
          </Text>
          <Text style={styles.whiteSubtitle}>Protein</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    height: 250,
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 3,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  nutritionFloat: {
    position: 'absolute',
    top: 127,
    left: 0,
    backgroundColor: 'rgba(100,100,100,0.5)',
    display: 'flex',
    flexDirection: 'row',
    width: '65%',
    paddingLeft: 8,
    paddingRight: 12,
    paddingTop: 6,
    borderTopRightRadius: 12,
  },
  nutritionFloatRight: {
    flex: 1,
  },
  nutritionFloatLeft: {
    flex: 1,
  },
  whiteTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  whiteSubtitle: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
  },
  whiteDivide: {
    height: '88%',
    width: 1,
    backgroundColor: '#fff',
  },
  icon: {
    margin: 0,
  },
});

export default RecipeCard;
