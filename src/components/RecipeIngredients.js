import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const RecipeIngredients = ({ ingredients }) => (
  <View style={styles.container}>
    <View style={styles.recipeContainerBottom}>
      {ingredients.map(ingredient => (
        <TextInput
          style={styles.ingredient}
          editable={false}
          value={ingredient}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    height: '100%',
  },
  ingredientText: {
    fontSize: 20,
  },
  ingredient: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
});

export default RecipeIngredients;
