import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SvgIcon } from '@/components/svgicon';
import { GENRE_MAP, IMAGE_BASE_URL } from '@/constants/genres';
import { styles } from './styles/watchmoviecard.style';
import { WatchMovieCardProps } from './types/watchmoviecard.props';

export const WatchMovieCard: React.FC<WatchMovieCardProps> = ({
  posterPath,
  title,
  rating,
  genreIds,
  releaseDate,
  runtime = 139,
  onPress,
}) => {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const genre = genreIds && genreIds.length > 0 ? GENRE_MAP[genreIds[0]] || 'Unknown' : 'Unknown';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.star}>
            <SvgIcon name="star" size={16} color="#FF8700" />
          </Text>
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>
            <SvgIcon name="ticket" size={16} color="white" />
          </Text>
          <Text style={styles.detailText}>{genre}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>
            <SvgIcon name="calendar" size={16} color="white" />
          </Text>
          <Text style={styles.detailText}>{year}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>
            <SvgIcon name="clock" size={16} color="white" />
          </Text>
          <Text style={styles.detailText}>{runtime} minutes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
