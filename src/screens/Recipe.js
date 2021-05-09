import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    ingredient: 'Carrot',
    measurement: 'half',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    ingredient: 'Beer',
    measurement: '1 tbsp',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    ingredient: 'Blueberry',
    measurement: 'handful',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53aeb28ba',
    ingredient: 'Carrot',
    measurement: 'half',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97e63',
    ingredient: 'Beer',
    measurement: '1 tbsp',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571ee9d72',
    ingredient: 'Blueberry',
    measurement: 'handful',
  },
];

const Item = ({ ingredient, measurement }) => (
  <View style={styles.item}>
    <Text style={styles.ingredient}>{ingredient + ' | ' + measurement}</Text>
    <TouchableOpacity
      /*onPress={onPress}*/
      style={[styles.itemButton]}>
      <Text>Replace</Text>
    </TouchableOpacity>
  </View>
);

const Recipe = ({ history }) => {
  const renderItem = ({ item }) => (
    <Item ingredient={item.ingredient} measurement={item.measurement} />
  );

  return (
    <View style={styles.recipeContainerOuter}>
      <View style={styles.recipeContainerTop}>
        <View style={styles.recipeContainerTopLeft}>
          <Image
            style={styles.recipeMainImage}
            source={{
              uri:
                'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/frozen-fruit-smoothie-3.jpg',
            }}
          />
        </View>
        <View style={styles.recipeContainerTopRight}>
          <Text style={styles.recipeTitleLg}>RECIPE NAME</Text>
          <Text style={styles.recipeParagraph}>
            A brief summary about this recipe and highlights about it that
            people making it might like to know. A brief summary about this
            recipe and highlights about it that people making it might like to
            know.
          </Text>
        </View>
      </View>
      <View style={styles.recipeContainerMid}>
        <Text style={styles.recipeTitleSm}>Ingredients</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.recipeContainerBottom}>
        <Text style={styles.recipeTitleSm}>Instructions</Text>
        <Text style={styles.recipeParagraph}>
          Place all ingredients in the blender carafe in the order listed. Blend
          all ingredients together until smooth.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeContainerOuter: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  recipeContainerTop: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 25,
  },
  recipeContainerMid: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 8,
  },
  recipeContainerBottom: {
    flex: 1,
    padding: 8,
  },
  recipeContainerTopLeft: {
    flex: 2,
    justifyContent: 'center',
  },
  recipeContainerTopRight: {
    flex: 2,
    margin: 15,
  },
  recipeMainImage: {
    flex: 1,
    margin: 10,
    maxHeight: 200,
  },
  recipeTitleLg: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  recipeTitleSm: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingBottom: 8,
  },
  recipeParagraph: {
    color: '#000',
    fontSize: 14,
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 7,
    paddingLeft: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemButton: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 45,
    width: 75,
    padding: 10,
  },
  ingredient: {
    fontSize: 18,
  },
});

export default Recipe;
