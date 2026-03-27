import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgIcon } from '@/components/svgicon';
import { styles } from './styles/watchheader.style';

export const WatchHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <SvgIcon
          name="back"
          color="white"
          size={30}
        />
        
      </TouchableOpacity>

      <Text style={styles.title}>Watch list</Text>

      <View style={styles.placeholder} />
    </View>
  );
};
