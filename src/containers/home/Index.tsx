import { FlatList } from 'react-native';
import { Screen } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeaturedMovieCard, HomeHeader, LoadingFooter, MoviePosterCard } from './components';
import { Loading } from '@/components/loading/Loading';
import { OfflineIndicator } from '@/components/offlineindicator';
import { useHome } from './hooks/useHome';
import { FEATURED_WIDTH } from './components/featuredmoviecard/constant/constant';
import { RootStackParamList } from '@/navigation';
import { styles } from './styles/home.style';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
  const navigation = useNavigation<HomeNavigationProp>();

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

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  if (loading) {
    return <Loading loadingText='Loading movies'/>
  }

  return (
    <Screen style={styles.container}>
      <OfflineIndicator />

      <FlatList
        data={getSelectedMovies()}
        renderItem={({ item }) =>
          <MoviePosterCard
            posterPath={item.poster_path}
            onPress={() => handleMoviePress(item.id)}
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
              <FeaturedMovieCard
                posterPath={item.poster_path}
                index={index}
                onPress={() => handleMoviePress(item.id)}
              />
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
