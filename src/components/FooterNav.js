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
        color="#fb5636"
        onPress={goHome}
        iconStyle={styles.icon}
      />
      <Icon
        name="search"
        color="#fb5636"
        onPress={goToFilter}
        iconStyle={styles.icon}
      />
      <Icon name="favorite-border" color="#fb5636" iconStyle={styles.icon} />
      <Icon name="settings" color="#fb5636" iconStyle={styles.icon} />
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
