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
    id: 'bd7acbea-c1b1-46c2-aed5-3adfsabb28ba',
    ingredient: 'Carrot',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd93ra97f63',
    ingredient: 'Beer',
  },
  {
    id: '58694a0f-3da1-471f-bd96-146671e29d72',
    ingredient: 'Blueberry',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad66aeb28ba',
    ingredient: 'Carrot',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd66aa97e63',
    ingredient: 'Beer',
  },
  {
    id: '58694a0f-3da1-471f-bd96-146671ee9d72',
    ingredient: 'Blueberry',
  },
];

const Replace = ({ history }) => {
  const Item = ({ ingredient }) => (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => history.push('/confirm')}>
        <Text style={styles.ingredient}>{ingredient}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item ingredient={item.ingredient} measurement={item.measurement} />
  );

  return (
    <View style={styles.replaceContainerOuter}>
      <View style={styles.replaceContainerTop}>
        <Text style={styles.replaceTitleLg}>REPLACE</Text>
      </View>
      <View style={styles.replaceContainerMid}>
        <Image
          style={styles.replaceMainImage}
          source={{
            uri:
              'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/frozen-fruit-smoothie-3.jpg',
          }}
        />
        <Text style={styles.replaceTitleMed}>INGREDIENT NAME</Text>
      </View>
      <View style={styles.replaceContainerBottom}>
        <Text style={styles.replaceTitleSm}>REPLACEMENT RECOMMENDATIONS</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  replaceContainerOuter: {
    flex: 1,
    justifyContent: 'space-between',
  },
  replaceContainerTop: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  replaceContainerMid: {
    flex: 4,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  replaceContainerBottom: {
    flex: 4,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  replaceTitleLg: {
    color: '#000',
    fontSize: 34,
    fontWeight: 'bold',
    paddingTop: 40,
    textAlign: 'center',
  },
  replaceTitleMed: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  replaceTitleSm: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  replaceMainImage: {
    minHeight: 180,
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

export default Replace;
