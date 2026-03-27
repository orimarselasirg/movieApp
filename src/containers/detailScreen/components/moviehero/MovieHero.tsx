import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgIcon } from '@/components/svgicon';
import { colors } from '@/theme/colors';
import { styles } from './styles/moviehero.style';

interface MovieHeroProps {
  backdropPath: string;
  posterPath: string;
  title: string;
  rating: number;
  year: string;
  duration: number;
  genre: string;
  trailerKey?: string | null;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  backdropPath,
  posterPath,
  title,
  rating,
  year,
  duration,
  genre,
  trailerKey,
}) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const handlePlayTrailer = async () => {
    if (!trailerKey) {
      Alert.alert('No Trailer', 'No trailer available for this movie');
      return;
    }

    const youtubeUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
    const youtubeAppUrl = `vnd.youtube://watch?v=${trailerKey}`;

    try {
      const canOpenApp = await Linking.canOpenURL(youtubeAppUrl);
      if (canOpenApp) {
        await Linking.openURL(youtubeAppUrl);
      } else {
        await Linking.openURL(youtubeUrl);
      }
    } catch (error) {
      console.error('Error opening trailer:', error);
      Alert.alert('Error', 'Could not open trailer');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backdropContainer}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${backdropPath}` }}
          style={styles.backdrop}
          resizeMode="cover"
        />
        <View style={{...styles.detailsRow, position: "absolute", bottom: 0, right: 10, zIndex: 100}}>
          <View style={styles.ratingContainer}>
            <SvgIcon name="star" size={16} color={colors.accent.rating} />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        <LinearGradient
          colors={[colors.common.transparent, colors.background.overlay, colors.background.tertiary]}
          style={styles.gradient}
        />

        {trailerKey && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayTrailer}
          >
            <SvgIcon name="play" size={32} color={colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

        </View>
      </View>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
      }}>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <SvgIcon name="calendar" size={14} color={colors.text.secondary} />
            <Text style={styles.metaText}>{year}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.metaItem}>
            <SvgIcon name="clock" size={14} color={colors.text.secondary} />
            <Text style={styles.metaText}>{duration} Minutes</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.metaItem}>
            <SvgIcon name="ticket" size={14} color={colors.text.secondary} />
            <Text style={styles.metaText}>{genre}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
