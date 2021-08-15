import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeIngredients = recipe => {
  const renderIngredients = () => {
    if (recipe.ingredients.length) {
      return recipe.ingredients.map(ingredient => (
        <Text style={styles.ingredient}>{ingredient}</Text>
      ));
    } else {
      return ['loading...'].map(ingredient => (
        <Text style={styles.ingredient}>{ingredient}</Text>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.recipeContainerBottom}>{renderIngredients()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    height: '100%',
  },
  ingredient: {
    fontSize: 18,
  },
});

export default RecipeIngredients;
