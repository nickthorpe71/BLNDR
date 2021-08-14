import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RecipeCard from '../components/RecipeCard';

const Results = ({ history, userState, updateState }) => {
  const renderResults = () => {
    const imageStyle = {
      resizeMode: 'cover',
      width: 165,
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      flex: 3,
    };

    return userState.recipeResults.map((recipe, index) => {
      const margin = index % 2 === 0 ? 20 : 0;

      const cardStyle = {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        height: 250,
        width: 165,
        marginBottom: 10,
        marginTop: 10,
        marginRight: margin,
        position: 'relative',
      };

      return (
        <RecipeCard
          key={index}
          history={history}
          userState={userState}
          updateState={updateState}
          recipe={recipe}
          cardStyle={cardStyle}
          imageStyle={imageStyle}
        />
      );
    });
  };

  return (
    <View style={styles.resultsContainer}>
      <View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => history.push('/filter')}>
          <Text style={styles.clearButtonText}>{'Back To Search'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollInner}>{renderResults()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingTop: 30,
    backgroundColor: '#fff',
    width: 160,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'black',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    width: '100%',
  },
  scrollInner: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});

export default Results;
