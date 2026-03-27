import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@movieapp:favorites';

export interface FavoriteMovie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
  genreIds: number[];
  runtime?: number;
}

export const favoritesService = {
  async getFavorites(): Promise<FavoriteMovie[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async addFavorite(movie: FavoriteMovie): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const exists = favorites.some((fav) => fav.id === movie.id);

      if (!exists) {
        const updatedFavorites = [...favorites, movie];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  async removeFavorite(movieId: number): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  async isFavorite(movieId: number): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some((fav) => fav.id === movieId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },

  async toggleFavorite(movie: FavoriteMovie): Promise<boolean> {
    try {
      const isFav = await this.isFavorite(movie.id);

      if (isFav) {
        await this.removeFavorite(movie.id);
        return false;
      } else {
        await this.addFavorite(movie);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  },
};
