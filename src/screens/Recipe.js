import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import RecipeIngredients from '../components/RecipeIngredients';
import RecipePrep from '../components/RecipePrep';

const Recipe = ({ history, userState }) => {
  const recipe = userState.selectedRecipe;
  const [activeTab, setActiveTab] = useState(0);
  const [tabKey1, setTabKey1] = useState(0);
  const [tabKey2, setTabKey2] = useState(1);
  const [tabKey3, setTabKey3] = useState(2);

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
          {/* {activeTab === 2 && (
            <DietaryFilter
              forceRemount={() => setTabKey3(tabKey3 + 1)}
              key={tabKey3}
              userState={userState}
              updateState={updateState}
            />
          )} */}
        </View>
      </View>
      <View style={styles.bottomScrollBuffer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipeContainerOuter: {
    flex: 1,
    paddingHorizontal: 18,
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
  bottomScrollBuffer: {
    margin: 10,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#aaa',
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
});

export default Recipe;
