import React from 'react';
import { View, FlatList } from 'react-native';
import { Screen } from 'react-native-screens';
import { SearchBar } from '@/components/searchBar/SearchBar';
import { SearchHeader, MovieSearchCard, EmptyState } from './components';
import { LoadingFooter } from '../home/components';
import { Loading } from '@/components/loading/Loading';
import { useSearch } from './hooks/useSearch';
import { styles } from './styles/search.style';

const SearchScreen = () => {
  const {
    searchQuery,
    searchResults,
    loading,
    loadingMore,
    handleSearch,
    loadMoreResults,
  } = useSearch();

  if (loading && searchResults.length === 0) {
    return <Loading loadingText="Buscando películas..." />;
  }

  return (
    <Screen style={styles.container}>
      <SearchHeader title="Search" />

      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar películas..."
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
