import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ConfirmReplace = ({ history }) => {
  return (
    <View style={styles.confirmContainerOuter}>
      <View style={styles.confirmContainerTop}>
        <Text style={styles.confirmTitleLg}>REPLACE</Text>
      </View>
      <View style={styles.confirmContainerMid}>
        <Image
          style={styles.confirmMainImage}
          source={{
            uri:
              'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/frozen-fruit-smoothie-3.jpg',
          }}
        />
        <Text style={styles.confirmTitleMed}>INGREDIENT NAME OLD</Text>
        <Text style={styles.confirmTitleMed}>WITH</Text>
        <Text style={styles.confirmTitleMed}>INGREDIENT NAME NEW</Text>
        <Image
          style={styles.confirmMainImage}
          source={{
            uri:
              'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/frozen-fruit-smoothie-3.jpg',
          }}
        />
      </View>
      <View style={styles.confirmContainerBottom}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => history.push('/confirm')}>
          <Text style={styles.ingredient}>REPLACE ITEM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => history.push('/confirm')}>
          <Text style={styles.ingredient}>Don't Replace</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmContainerOuter: {
    flex: 1,
    justifyContent: 'space-between',
  },
  confirmContainerTop: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  confirmContainerMid: {
    flex: 3,
    justifyContent: 'center',
  },
  confirmContainerBottom: {
    flex: 2,
    justifyContent: 'center',
  },
  confirmTitleLg: {
    color: '#000',
    fontSize: 34,
    fontWeight: 'bold',
    paddingTop: 40,
    textAlign: 'center',
  },
  confirmTitleMed: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmTitleSm: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmMainImage: {
    minHeight: 140,
    margin: 30,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  ingredient: {
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default ConfirmReplace;
