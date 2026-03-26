import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { styles } from './styles/movieposter.style';
import { MoviePosterCardProps } from './types/moviepostercard.prop';
import { IMAGE_BASE_URL } from '../../constant/constant';


export const MoviePosterCard: React.FC<MoviePosterCardProps> = ({
  posterPath,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.posterCard} onPress={onPress}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
        style={styles.posterImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};


