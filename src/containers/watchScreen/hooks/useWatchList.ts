import { useState, useCallback } from 'react';
import { favoritesService, FavoriteMovie } from '@/services/favorites.service';
import { useFocusEffect } from '@react-navigation/native';

export const useWatchList = () => {
  const [watchList, setWatchList] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWatchList = useCallback(async () => {
    setLoading(true);
    try {
      const favorites = await favoritesService.getFavorites();
      setWatchList(favorites);
    } catch (error) {
      console.error('Error loading watch list:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadWatchList();
    }, [loadWatchList])
  );

  const removeFromWatchList = async (movieId: number) => {
    try {
      await favoritesService.removeFavorite(movieId);
      await loadWatchList();
    } catch (error) {
      console.error('Error removing from watch list:', error);
    }
  };

  return {
    watchList,
    loading,
    removeFromWatchList,
    hasMovies: watchList.length > 0,
    refreshWatchList: loadWatchList,
  };
};
