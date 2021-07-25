import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useHistory } from 'react-router-dom';

const Header = props => {
  let history = useHistory();

  const goHome = () => {
    history.push('/');
  };

  const goToFilter = () => {
    history.push('/filter');
  };

  return (
    <View style={styles.header}>
      <Icon
        name="home"
        color="#ff2b2b"
        onPress={goHome}
        iconStyle={styles.icon}
      />
      <Icon
        name="search"
        color="#ff2b2b"
        onPress={goToFilter}
        iconStyle={styles.icon}
      />
      <Icon name="favorite-border" color="#ff2b2b" iconStyle={styles.icon} />
      <Icon name="settings" color="#ff2b2b" iconStyle={styles.icon} />
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
