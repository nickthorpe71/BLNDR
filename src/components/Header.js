import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useHistory } from 'react-router-dom';

const Header = props => {
  let history = useHistory();

  const goHome = () => {
    history.push('/');
  };

  return (
    <View style={styles.header}>
      <Icon name="home" color="#fff" onPress={goHome} />
      <Text style={styles.text}>Blendr</Text>
      <Icon name="menu" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 45,
    padding: 10,
    backgroundColor: '#0a84ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    margin: 5,
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Header;
