import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';

import RecipeIngredients from '../components/RecipeIngredients';
import RecipePrep from '../components/RecipePrep';
import RecipeNutrition from '../components/RecipeNutrition';

const Recipe = ({ userState, updateState }) => {
  const [recipe, setRecipe] = useState(userState.selectedRecipe);
  const [liked, setLiked] = useState(userState.selectedRecipe.liked);
  const tabKey1 = 0;
  const tabKey2 = 1;
  const tabKey3 = 2;
  const [activeTab, setActiveTab] = useState(0);

  const renderNutritionSection = (
    value,
    title,
    isBottom = false,
    hasGrams = true,
  ) => (
    <View
      style={
        isBottom
          ? styles.nutritionFloatSectionBottom
          : styles.nutritionFloatSection
      }>
      <Text style={styles.nutritionTitle}>
        {value} {hasGrams && <Text style={styles.nutritionSubtitle}>g</Text>}{' '}
      </Text>
      <Text style={styles.nutritionSubtitle}>{title}</Text>
    </View>
  );

  const clickLike = () => {
    updateState(
      'curatedRecipes',
      userState.curatedRecipes.map(rec => {
        if (rec.title === recipe.title) {
          rec.liked = !rec.liked;
          setLiked(rec.liked);
          setRecipe(rec);
        }
        return rec;
      }),
    );
    updateState('selectedRecipe', recipe);
  };

  return (
    <ScrollView style={styles.recipeContainerOuter}>
      <View style={styles.recipeContainerTop}>
        <Text style={styles.recipeTitleLg}>{recipe.title}</Text>
        {liked ? (
          <Icon
            name="favorite"
            color="#ff3336"
            iconStyle={styles.likeIcon}
            onPress={clickLike}
          />
        ) : (
          <Icon
            name="favorite-border"
            color="#000"
            iconStyle={styles.likeIcon}
            onPress={clickLike}
          />
        )}
      </View>
      <View style={styles.recipeContainerMid}>
        <View style={styles.recipeContainerTopLeft}>
          <Image style={styles.recipeMainImage} source={recipe.image} />
        </View>
        <View style={styles.recipeContainerTopRight}>
          <View style={styles.nutritionFloat}>
            {renderNutritionSection(
              Math.round(recipe.totalNutrition.calories),
              'Calories',
              false,
              false,
            )}
            {renderNutritionSection(
              Math.round(recipe.totalNutrition.macros.carbs.amount),
              'Carbs',
            )}
            {renderNutritionSection(
              Math.round(recipe.totalNutrition.macros.fat.amount),
              'Fats',
            )}
            {renderNutritionSection(
              Math.round(recipe.totalNutrition.macros.protein.amount),
              'Protein',
              true,
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={
              activeTab === 0 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => setActiveTab(0)}>
            <Text style={styles.tabButtonText}>{'INGREDIENTS'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 1 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => setActiveTab(1)}>
            <Text style={styles.tabButtonText}>{'PREPARATION'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 2 ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => setActiveTab(2)}>
            <Text style={styles.tabButtonText}>{'NUTRITION INFO'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          {activeTab === 0 && (
            <RecipeIngredients
              key={tabKey1}
              ingredients={userState.selectedRecipe.ingredients}
            />
          )}
          {activeTab === 1 && (
            <RecipePrep
              key={tabKey2}
              instructions={userState.selectedRecipe.instructions}
            />
          )}
          {activeTab === 2 && (
            <RecipeNutrition
              key={tabKey3}
              nutrition={userState.selectedRecipe.totalNutrition}
            />
          )}
        </View>
      </View>
      <View style={styles.bottomScrollBuffer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipeContainerOuter: {
    flex: 1,
  },
  recipeContainerMid: {
    flex: 4,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  recipeContainerBottom: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  recipeContainerTop: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  bottomScrollBuffer: {
    margin: 10,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    paddingRight: 15,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    paddingBottom: 8,
    flex: 1,
    height: 50,
  },
  tabButtonSelected: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    paddingBottom: 5,
    flex: 1,
    borderBottomColor: '#fb5636',
    borderWidth: 3,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  tabButtonText: {
    fontSize: 14,
    color: 'black',
  },
  nutritionFloat: {
    position: 'absolute',
    backgroundColor: '#9bffc1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.26,
  },
  nutritionFloatSection: {
    flex: 1,
    borderBottomColor: '#000',
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingBottom: 6,
    marginBottom: 5,
  },
  nutritionFloatSectionBottom: {
    flex: 1,
    marginBottom: 5,
  },
  nutritionTitle: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nutritionSubtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  likeIcon: {
    fontSize: 35,
    paddingBottom: 18,
  },
});

export default Recipe;
