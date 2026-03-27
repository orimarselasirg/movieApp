import React from 'react';
import { FlatList } from 'react-native';
import { Screen } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WatchEmptyState, WatchMovieCard } from './components';
import { useWatchList } from './hooks/useWatchList';
import { Loading } from '@/components/loading/Loading';
import { RootStackParamList } from '@/navigation';
import { styles } from './styles/watchscreen.style';
import { SearchHeader } from '../searchScreen/components';

type WatchNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WatchScreen = () => {
  const navigation = useNavigation<WatchNavigationProp>();
  const { watchList, loading, hasMovies } = useWatchList();

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  if (loading) {
    return <Loading loadingText="Loading list" />;
  }

  return (
    <Screen style={styles.container}>
      
      <SearchHeader
        title='Watch list'
        showIcon={false}
      />

      {!hasMovies ? (
        <WatchEmptyState />
      ) : (
        <FlatList
          data={watchList}
          renderItem={({ item }) => (
            <WatchMovieCard
              posterPath={item.posterPath}
              title={item.title}
              rating={item.rating}
              genreIds={item.genreIds}
              releaseDate={item.releaseDate}
              runtime={item.runtime}
              onPress={() => handleMoviePress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
};

export default WatchScreen;
