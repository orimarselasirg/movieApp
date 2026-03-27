import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGE_BASE_URL } from '../../constant/constant';
import { styles } from './styles/featuremoviecard.style';
import { FeaturedMovieCardProps } from './types/featuremovie.props';

export const FeaturedMovieCard: React.FC<FeaturedMovieCardProps> = ({
  posterPath,
  index,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.featuredGradient}
        />
      </View>
      <View style={styles.featuredNumber}>
        <Text style={styles.featuredNumberText}>
          {index + 1}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


