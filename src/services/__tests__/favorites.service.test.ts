import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritesService, FavoriteMovie } from '../favorites.service';

jest.mock('@react-native-async-storage/async-storage');

describe('favoritesService', () => {
  const mockMovie: FavoriteMovie = {
    id: 1,
    title: 'Test Movie',
    posterPath: '/test.jpg',
    rating: 8.5,
    releaseDate: '2023-01-01',
    genreIds: [28],
    runtime: 120,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('should return favorites from storage', async () => {
      const mockFavorites = [mockMovie];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockFavorites)
      );

      const result = await favoritesService.getFavorites();

      expect(result).toEqual(mockFavorites);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@movieapp:favorites');
    });

    it('should return empty array if no favorites', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await favoritesService.getFavorites();

      expect(result).toEqual([]);
    });

    it('should handle error and return empty array', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Error'));

      const result = await favoritesService.getFavorites();

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('addFavorite', () => {
    it('should add movie to favorites', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

      await favoritesService.addFavorite(mockMovie);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@movieapp:favorites',
        JSON.stringify([mockMovie])
      );
    });

    it('should not add duplicate movie', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify([mockMovie])
      );

      await favoritesService.addFavorite(mockMovie);

      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('removeFavorite', () => {
    it('should remove movie from favorites', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify([mockMovie])
      );

      await favoritesService.removeFavorite(1);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@movieapp:favorites',
        JSON.stringify([])
      );
    });
  });

  describe('isFavorite', () => {
    it('should return true if movie is favorite', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify([mockMovie])
      );

      const result = await favoritesService.isFavorite(1);

      expect(result).toBe(true);
    });

    it('should return false if movie is not favorite', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

      const result = await favoritesService.isFavorite(1);

      expect(result).toBe(false);
    });
  });

  describe('toggleFavorite', () => {
    it('should add movie if not favorite', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

      const result = await favoritesService.toggleFavorite(mockMovie);

      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it('should remove movie if already favorite', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify([mockMovie])
      );

      const result = await favoritesService.toggleFavorite(mockMovie);

      expect(result).toBe(false);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });
});
