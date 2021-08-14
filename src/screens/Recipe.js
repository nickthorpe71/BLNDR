import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Recipe = ({ history, userState, updateState }) => {
  const recipe = userState.selectedRecipe;
  const [activeTab, setActiveTab] = useState(0);
  const [tabKey1, setTabKey1] = useState(0);
  const [tabKey2, setTabKey2] = useState(1);
  const [tabKey3, setTabKey3] = useState(2);

  const renderIngredients = () =>
    recipe.ingredients.map(ingredient => (
      <Text style={styles.ingredient}>{ingredient}</Text>
    ));

  return (
    <ScrollView style={styles.recipeContainerOuter}>
      <View style={styles.recipeContainerTop}>
        <Text style={styles.recipeTitleLg}>{recipe.title}</Text>
      </View>
      <View style={styles.recipeContainerMid}>
        <View style={styles.recipeContainerTopLeft}>
          <Image style={styles.recipeMainImage} source={recipe.image} />
        </View>
        <View style={styles.recipeContainerTopRight}>
          <Image
            style={styles.recipeMainImage}
            source={userState.selectedRecipe.image}
          />
        </View>
      </View>
      <View style={styles.recipeContainerBottom}>
        <Text style={styles.recipeTitleSm}>Ingredients</Text>
        {renderIngredients()}
      </View>
      <View style={styles.bottomScrollBuffer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipeContainerOuter: {
    flex: 1,
    padding: 18,
  },
  recipeContainerMid: {
    flex: 4,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  recipeContainerBottom: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  recipeContainerTop: {
    flex: 1,
  },
  recipeContainerTopLeft: {
    flex: 3,
  },
  recipeContainerTopRight: {
    flex: 1,
  },
  recipeMainImage: {
    flex: 1,
    width: 235,
    height: 255,
    borderRadius: 20,
  },
  recipeTitleLg: {
    color: '#000',
    fontSize: 32,
    marginBottom: 20,
  },
  recipeTitleSm: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  ingredient: {
    fontSize: 18,
  },
  bottomScrollBuffer: {
    margin: 10,
  },
});

export default Recipe;
