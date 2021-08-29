import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipePrep = ({ instructions }) => {
  const renderInstructions = () =>
    instructions
      .split('\n')
      .join('.')
      .split('.')
      .map((instruction, index) => (
        <View key={instruction} style={styles.instructionRow}>
          <View style={styles.outerCircle}>
            <Text style={styles.instructionNum}>{index + 1}</Text>
          </View>
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>
      ));

  return (
    <View style={styles.container}>
      <View>{renderInstructions()}</View>
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
  instructionRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
  },
  instructionText: {
    fontSize: 12,
  },
  instructionNum: {
    fontSize: 14,
    color: 'white',
    paddingTop: 1,
    fontWeight: 'bold',
  },
  outerCircle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    width: 20,
    height: 20,
    backgroundColor: '#fb5636',
    marginRight: 10,
  },
});

export default RecipePrep;
