import { renderHook } from '@testing-library/react-native';
import { useWatchList } from '../useWatchList';
import { favoritesService, FavoriteMovie } from '@/services/favorites.service';

jest.mock('@/services/favorites.service');
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn((callback) => {
    
  }),
}));

describe('useWatchList', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    (favoritesService.getFavorites as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useWatchList());

    expect(result.current.watchList).toEqual([]);
    expect(result.current.hasMovies).toBe(false);
  });

  it('should provide removeFromWatchList method', () => {
    (favoritesService.getFavorites as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useWatchList());

    expect(typeof result.current.removeFromWatchList).toBe('function');
  });

  it('should provide refreshWatchList method', () => {
    (favoritesService.getFavorites as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useWatchList());

    expect(typeof result.current.refreshWatchList).toBe('function');
  });
});
