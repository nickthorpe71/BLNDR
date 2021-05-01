import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Header = props => {
  return (
    <View style={styles.header}>
      <Icon
        name="home"
        color="#fff"
        style={styles.icon}
        onPress={props.goHome}
      />
      <Text style={styles.text}>Blendr</Text>
      <Icon name="menu" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 45,
    padding: 15,
    backgroundColor: '#aaa',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    color: '#fff',
  },
});

export default Header;
