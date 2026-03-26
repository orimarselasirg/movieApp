import { FlatList } from 'react-native';
import { Screen } from 'react-native-screens';
import { FeaturedMovieCard, HomeHeader, LoadingFooter, MoviePosterCard } from './components';
import { Loading } from '@/components/loading/Loading';
import { useHome } from './hooks/useHome';
import { FEATURED_WIDTH } from './components/featuredmoviecard/constant/constant';
import { styles } from './styles/home.style';

const Home = () => {

  const {
    TABS,
    loadMoreMovies,
    getSelectedMovies,
    popularMovies,
    setSelectedTab,
    loading,
    loadingMore,
    selectedTab
  } = useHome()
 
  if (loading) {
    return <Loading loadingText='Cargando pelicula'/>
  }

  return (
    <Screen style={styles.container}>
      
      <FlatList
        data={getSelectedMovies()}
        renderItem={({ item }) => 
          <MoviePosterCard
            posterPath={item.poster_path}
          />
        }
        keyExtractor={(item) => `${item.id}`}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={
          <HomeHeader
            title="What do you want to watch?"
            popularMovies={popularMovies}
            renderFeaturedMovie={({ item, index }) => (               
              <FeaturedMovieCard posterPath={item.poster_path} index={index} />                                                                                                  
            )}
            featuredWidth={FEATURED_WIDTH}
            tabs={TABS}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />
        }
        ListFooterComponent={
          <LoadingFooter
            isLoading={loadingMore}
          />}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};



export default Home;
