import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgIcon } from '@/components/svgicon';
import { styles } from './styles/moviehero.style';

interface MovieHeroProps {
  backdropPath: string;
  posterPath: string;
  title: string;
  rating: number;
  year: string;
  duration: number;
  genre: string;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  backdropPath,
  posterPath,
  title,
  rating,
  year,
  duration,
  genre,
}) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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
            <SvgIcon name="star" size={16} color="#FF8700" />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', '#1F1D2B']}
          style={styles.gradient}
        />

        <TouchableOpacity style={styles.playButton}>
          <SvgIcon name="play" size={32} color="white" />
        </TouchableOpacity>
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
            <SvgIcon name="calendar" size={14} color="#92929D" />
            <Text style={styles.metaText}>{year}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.metaItem}>
            <SvgIcon name="clock" size={14} color="#92929D" />
            <Text style={styles.metaText}>{duration} Minutes</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.metaItem}>
            <SvgIcon name="ticket" size={14} color="#92929D" />
            <Text style={styles.metaText}>{genre}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
