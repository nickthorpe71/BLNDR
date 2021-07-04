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
      <Icon name="home" color="#ff2b2b" onPress={goHome} iconStyle={styles.icon} />
      <Icon name="search" color="#ff2b2b" iconStyle={styles.icon} />
      <Icon name="love" color="#ff2b2b" iconStyle={styles.icon} />
      <Icon name="menu" color="#ff2b2b" iconStyle={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#999',
  },
  icon: {
    fontSize: 45,
  },
});

export default Header;
