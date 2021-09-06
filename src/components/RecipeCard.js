import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeCard = ({
  history,
  updateState,
  recipe,
  cardStyle,
  imageStyle,
}) => {
  const onPress = () => {
    updateState('selectedRecipe', recipe);
    history.push('/recipe');
  };

  return (
    <TouchableOpacity activeOpacity={1} style={cardStyle} onPress={onPress}>
      <Image source={recipe.image} style={imageStyle} />
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
