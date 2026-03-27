import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Screen } from 'react-native-screens';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation';
import { MovieDetailHeader, MovieHero } from './components';
import { useMovieDetail } from './hooks/useMovieDetail';
import { useFavorites } from '@/hooks/useFavorites';
import { Loading } from '@/components/loading/Loading';
import { styles } from './styles/moviedetail.style';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

const MovieDetail = () => {
  const route = useRoute<MovieDetailRouteProp>();
  const { movieId } = route.params;

  const { movie, loading, error } = useMovieDetail(movieId);
  const { isFavorite, toggleFavorite } = useFavorites(movieId);

  const handleBookmarkPress = () => {
    if (movie) {
      toggleFavorite({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        genreIds: movie.genres.map((genre) => genre.id),
        runtime: movie.runtime,
      });
    }
  };

  if (loading) {
    return <Loading loadingText="Loading details..." />;
  }

  if (error || !movie) {
    return (
      <Screen style={styles.container}>
        <MovieDetailHeader isFavorite={false} onBookmarkPress={() => {}} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || 'Could not load the movie'}
          </Text>
        </View>
      </Screen>
    );
  }

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear().toString()
    : '';
  const genre = movie.genres.length > 0 ? movie.genres[0].name : 'Unknown';

  return (
    <Screen style={styles.container}>
      <MovieDetailHeader
        isFavorite={isFavorite}
        onBookmarkPress={handleBookmarkPress}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <MovieHero
          backdropPath={movie.backdrop_path}
          posterPath={movie.poster_path}
          title={movie.title}
          rating={movie.vote_average}
          year={year}
          duration={movie.runtime}
          genre={genre}
        />

        <View style={styles.overviewContainer}>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default MovieDetail;
