import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useFavorites } from '../useFavorites';
import { favoritesService, FavoriteMovie } from '@/services/favorites.service';

jest.mock('@/services/favorites.service');

describe('useFavorites', () => {
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

  it('should check if movie is favorite on mount', async () => {
    (favoritesService.isFavorite as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useFavorites(1));

    await waitFor(() => {
      expect(result.current.isFavorite).toBe(true);
    });

    expect(favoritesService.isFavorite).toHaveBeenCalledWith(1);
  });

  it('should toggle favorite status', async () => {
    (favoritesService.isFavorite as jest.Mock).mockResolvedValue(false);
    (favoritesService.toggleFavorite as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useFavorites(1));

    await act(async () => {
      await result.current.toggleFavorite(mockMovie);
    });

    await waitFor(() => {
      expect(result.current.isFavorite).toBe(true);
    });

    expect(favoritesService.toggleFavorite).toHaveBeenCalledWith(mockMovie);
  });

  it('should handle toggle favorite error', async () => {
    (favoritesService.isFavorite as jest.Mock).mockResolvedValue(false);
    (favoritesService.toggleFavorite as jest.Mock).mockRejectedValue(
      new Error('Toggle failed')
    );

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useFavorites(1));

    await act(async () => {
      await result.current.toggleFavorite(mockMovie);
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should not check favorite status without movieId', () => {
    const { result } = renderHook(() => useFavorites(undefined));

    expect(result.current.isFavorite).toBe(false);
    expect(favoritesService.isFavorite).not.toHaveBeenCalled();
  });
});
