import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TabSelectorProps } from './types/tabselector.props';
import { styles } from './styles/tabselector.styles';

export function TabSelector<T extends string>({
  tabs,
  selectedTab,
  onSelectTab,
  containerStyle,
  tabStyle,
  tabActiveStyle,
  tabTextStyle,
  tabTextActiveStyle,
}: Readonly<TabSelectorProps<T>>) {
  return (
    <View style={[styles.tabsContainer, containerStyle]}>
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              tabStyle,
              isActive && styles.tabActive,
              isActive && tabActiveStyle,
            ]}
            onPress={() => onSelectTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                tabTextStyle,
                isActive && styles.tabTextActive,
                isActive && tabTextActiveStyle,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
