import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import utils from '../utils';

const RecipeNutrition = ({ nutrition }) => {
  const renderKeys = section => {
    return Object.keys(section).map(key => {
      if (key === 'calories') {
        return <></>;
      }
      const hasChildren = Object.keys(section[key])[0] !== 'measure';
      return (
        <>
          {!hasChildren ? (
            <Row style={styles.cell}>
              <Text style={styles.cellFont}>{key}</Text>
              <View style={styles.row}>
                <Text style={styles.valueFont}>
                  {Math.round(section[key].amount)}
                  {utils.capitalizeFirstLetter(section[key].measure)}
                </Text>
              </View>
            </Row>
          ) : (
            <Row style={styles.cell}>
              <View style={styles.row}>
                <Text style={styles.cellFont}>
                  {utils.capitalizeFirstLetter(key)}
                </Text>
                {renderKeys(section[key])}
              </View>
            </Row>
          )}
        </>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Grid>
        <Col size={60} style={styles.left}>
          <Row style={styles.cell}>
            <Text style={styles.cellFont}>{''}</Text>
            {renderKeys(nutrition)}
          </Row>
        </Col>
        <Col size={40} style={styles.right}>
          <Row style={styles.cellRight}>
            <Text style={styles.cellFont}>{'% Daily Value'}</Text>
          </Row>
        </Col>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 15,
    height: '84%',
  },
  cell: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cellRight: {
    borderBottomWidth: 1,
    borderColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  cellFont: {
    fontSize: 12,
    padding: 5,
    fontWeight: 'bold',
  },
  valueFont: {
    fontSize: 12,
    padding: 5,
    paddingHorizontal: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    backgroundColor: 'white',
  },
  right: {
    backgroundColor: '#eee',
  },
});

export default RecipeNutrition;
