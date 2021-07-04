import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default RecipeCard;
