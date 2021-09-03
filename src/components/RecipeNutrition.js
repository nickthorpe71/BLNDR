import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import utils from '../utils';

import dailyValues from '../data/dailyValues.json';

const RecipeNutrition = ({ nutrition }) => {
  const percentString = (numerator, denominator) =>
    `${String(Math.round((numerator / denominator) * 100))}%`;

  const renderLeftCol = section => {
    return Object.keys(section).map(key => {
      if (key === 'calories') {
        return <></>;
      }
      const hasChildren = Object.keys(section[key])[0] === 'measure';
      return (
        <>
          {hasChildren ? (
            <Row>
              <Col style={styles.leftCol} size={33}>
                <Text style={styles.cellFont}>
                  {utils.capitalizeFirstLetter(key)}
                </Text>
              </Col>
              <Col style={styles.midCol} size={33}>
                <Text style={styles.valueFont}>
                  {` ${Math.round(
                    section[key].amount,
                  )}${utils.capitalizeFirstLetter(section[key].measure)}`}
                </Text>
              </Col>
              <Col style={styles.rightCol} size={33}>
                <Text style={styles.valueFont}>
                  {percentString(section[key].amount, dailyValues[key])}
                </Text>
              </Col>
            </Row>
          ) : (
            <>{renderLeftCol(section[key])}</>
          )}
        </>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Grid>
        <Row>
          <Col style={styles.leftCol} size={33}>
            <Text style={styles.cellFont}>Calories</Text>
          </Col>
          <Col style={styles.midCol} size={33}>
            <Text style={styles.valueFont}>
              {Math.round(nutrition.calories)}
            </Text>
          </Col>
          <Col style={styles.rightCol} size={33}>
            <Text style={styles.cellFont}>{'% Daily Value'}</Text>
          </Col>
        </Row>
        {renderLeftCol(nutrition)}
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
  },
  cellFont: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  valueFont: {
    fontSize: 12,
    paddingHorizontal: 10,
  },
  rightCol: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingVertical: 5,
  },
  midCol: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 5,
  },
  leftCol: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 5,
  },
});

export default RecipeNutrition;
