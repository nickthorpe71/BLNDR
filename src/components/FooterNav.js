import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useHistory } from 'react-router-dom';

const Header = props => {
  const history = useHistory();

  return (
    <View style={styles.header}>
      <Icon
        name="home"
        color="#fb5636"
        onPress={() => history.push('/')}
        iconStyle={styles.icon}
      />
      <Icon
        name="search"
        color="#fb5636"
        onPress={() => history.push('/filter')}
        iconStyle={styles.icon}
      />
      <Icon
        name="favorite-border"
        color="#fb5636"
        onPress={() => history.push('/favorites')}
        iconStyle={styles.icon}
      />
      <Icon
        name="settings"
        color="#fb5636"
        onPress={() => history.push('/settings')}
        iconStyle={styles.icon}
      />
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
