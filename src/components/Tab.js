import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tab = ({ activeTab, label, onClick }) => {
  const renderTab = () => {
    let tabStyle = 'tabListItem';
    if (activeTab === label) {
      tabStyle += ' tabListActive';
    }

    return (
      <li className={tabStyle} onClick={() => onClick(label)}>
        {label}
      </li>
    );
  };

  return <>{renderTab()}</>;
};

const styles = StyleSheet.create({
  tabListItem: {
    display: 'inline-block',
    listStyle: 'none',
    marginBottom: '-1px',
    padding: '0.5rem 0.75rem',
  },
  tabListActive: {
    backgroundColor: 'white',
    border: 'solid #ccc',
    borderWidth: '1px 1px 0 1px',
  },
});

export default Tab;
