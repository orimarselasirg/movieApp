import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgIcon } from '@/components/svgicon';
import { colors } from '@/theme/colors';
import { styles } from './styles/moviedetailheader.style';

interface MovieDetailHeaderProps {
  isFavorite: boolean;
  onBookmarkPress: () => void;
}

export const MovieDetailHeader: React.FC<MovieDetailHeaderProps> = ({
  isFavorite,
  onBookmarkPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <SvgIcon name="back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Detail</Text>

      <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmarkPress}>
        <SvgIcon
          name="bookmark"
          size={24}
          color={isFavorite ? colors.accent.rating : colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};
