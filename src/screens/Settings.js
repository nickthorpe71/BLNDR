import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Share,
  Linking,
} from 'react-native';
import { Icon } from 'react-native-elements';
import InAppReview from 'react-native-in-app-review';

const ExpandableComponent = ({ item, onClickFunction }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <Icon name={item.icon} color="#fb5636" iconStyle={styles.icon} />
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {item.subcategory.map((item, key) => (
          <View key={key} style={styles.content}>
            <Text style={styles.text}>{item.val}</Text>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </View>
  );
};

const onShare = async () => {
  try {
    const result = await Share.share({
      title: 'App link',
      message:
        'Check out this great app for finding smoothie recipes!, AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
      url:
        'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const requestReview = () => {
  InAppReview.RequestInAppReview();
};

const sendToGithub = () => {
  openURL('https://github.com/nickthorpe71/BLNDR');
};

const openURL = url => {
  Linking.openURL(url).catch(err => console.error('An error occurred', err));
};

const Settings = () => {
  const [listDataSource, setListDataSource] = useState(CONTENT);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array.map((value, placeIndex) =>
      placeIndex === index
        ? (array[placeIndex].isExpanded = !array[placeIndex].isExpanded)
        : (array[placeIndex].isExpanded = false),
    );
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={requestReview}
            style={styles.header}>
            <Icon name="star" color="#fb5636" iconStyle={styles.icon} />
            <Text style={styles.headerText}>Rate this app</Text>
          </TouchableOpacity>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onShare}
            style={styles.header}>
            <Icon name="share" color="#fb5636" iconStyle={styles.icon} />
            <Text style={styles.headerText}>Tell a friend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={sendToGithub}
            style={styles.header}>
            <Icon name="source" color="#fb5636" iconStyle={styles.icon} />
            <Text style={styles.headerText}>Contribute</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 14,
    color: '#606070',
    padding: 10,
    marginLeft: 12,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 35,
  },
});

const CONTENT = [
  {
    isExpanded: false,
    icon: 'contacts',
    category_name: 'Support',
    subcategory: [{ id: 4, val: 'blndrinfo@gmail.com' }],
  },
];

export default Settings;
