import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/searchheader.style';
import { SvgIcon } from '@/components/svgicon';

interface SearchHeaderProps {
  title: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backIcon}>
        <SvgIcon
          name="back"
          color="white"
          size={30}
        />
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoIcon}>ⓘ</Text>
      </TouchableOpacity>
    </View>
  );
};
