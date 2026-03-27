import { useState, useEffect, useCallback } from 'react';
import { favoritesService, FavoriteMovie } from '@/services/favorites.service';

export const useFavorites = (movieId?: number) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkFavoriteStatus = useCallback(async () => {
    if (!movieId) return;

    try {
      const status = await favoritesService.isFavorite(movieId);
      setIsFavorite(status);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  }, [movieId]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const toggleFavorite = useCallback(
    async (movie: FavoriteMovie) => {
      setLoading(true);
      try {
        const newStatus = await favoritesService.toggleFavorite(movie);
        setIsFavorite(newStatus);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    isFavorite,
    loading,
    toggleFavorite,
    refreshFavoriteStatus: checkFavoriteStatus,
  };
};
