import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles/watchemptystate.style';

export const WatchEmptyState = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/magic_box.png')}
        style={styles.image}
      />
      <Text style={styles.title}>There is No Movie Yet!</Text>
      <Text style={styles.subtitle}>
        Find your movie by Type title,{'\n'}categories, years, etc
      </Text>
    </View>
  );
};
