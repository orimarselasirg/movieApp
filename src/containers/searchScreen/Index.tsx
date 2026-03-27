import React from 'react';
import { View, FlatList } from 'react-native';
import { Screen } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchBar } from '@/components/searchBar/SearchBar';
import { SearchHeader, MovieSearchCard, EmptyState } from './components';
import { LoadingFooter } from '../home/components';
import { Loading } from '@/components/loading/Loading';
import { OfflineIndicator } from '@/components/offlineindicator';
import { useSearch } from './hooks/useSearch';
import { RootStackParamList } from '@/navigation';
import { styles } from './styles/search.style';

type SearchNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SearchScreen = () => {
  const navigation = useNavigation<SearchNavigationProp>();

  const {
    searchQuery,
    searchResults,
    loading,
    loadingMore,
    handleSearch,
    loadMoreResults,
  } = useSearch();

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  if (loading && searchResults.length === 0) {
    return <Loading loadingText="Searching movies..." />;
  }

  return (
    <Screen style={styles.container}>
      <OfflineIndicator />
      <SearchHeader title="Search" />

      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search movies..."
        />
      </View>

      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <MovieSearchCard
            posterPath={item.poster_path}
            title={item.title}
            rating={item.vote_average}
            genreIds={item.genre_ids}
            releaseDate={item.release_date}
            onPress={() => handleMoviePress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            loading={loading}
            searchQuery={searchQuery}
            hasResults={searchResults.length > 0}
          />
        }
        ListFooterComponent={
          <LoadingFooter
            isLoading={loadingMore}
          />
        }
        onEndReached={loadMoreResults}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default SearchScreen;
