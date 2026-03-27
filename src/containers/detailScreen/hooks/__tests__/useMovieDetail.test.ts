import { renderHook, waitFor } from '@testing-library/react-native';
import { useMovieDetail } from '../useMovieDetail';
import axiosInstance from '@/api/axios';
import { cacheService } from '@/services/cache.service';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

jest.mock('@/api/axios');
jest.mock('@/services/cache.service');
jest.mock('@/hooks/useNetworkStatus');

describe('useMovieDetail', () => {
  const mockMovieId = 123;
  const mockMovie = {
    id: 123,
    title: 'Test Movie',
    overview: 'Test overview',
    poster_path: '/test.jpg',
    backdrop_path: '/backdrop.jpg',
    vote_average: 8.5,
    release_date: '2023-01-01',
    runtime: 120,
    genres: [{ id: 28, name: 'Action' }],
  };

  const mockVideos = {
    results: [
      {
        id: '1',
        key: 'abc123',
        name: 'Official Trailer',
        site: 'YouTube',
        type: 'Trailer',
        official: true,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });
  });

  it('should fetch movie details and trailer when online', async () => {
    (axiosInstance.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockMovie })
      .mockResolvedValueOnce({ data: mockVideos });
    (cacheService.set as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useMovieDetail(mockMovieId));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movie).toEqual(mockMovie);
      expect(result.current.trailerKey).toBe('abc123');
      expect(result.current.error).toBeNull();
    });

    expect(axiosInstance.get).toHaveBeenCalledWith('/movie/123');
    expect(axiosInstance.get).toHaveBeenCalledWith('/movie/123/videos');
  });

  it('should use cache when offline', async () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: false });
    (cacheService.get as jest.Mock)
      .mockResolvedValueOnce(mockMovie)
      .mockResolvedValueOnce(mockVideos);

    const { result } = renderHook(() => useMovieDetail(mockMovieId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movie).toEqual(mockMovie);
      expect(result.current.trailerKey).toBe('abc123');
    });

    expect(axiosInstance.get).not.toHaveBeenCalled();
    expect(cacheService.get).toHaveBeenCalledWith('movie:123');
  });

  it('should handle error and fallback to cache', async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(new Error('API Error'));
    (cacheService.get as jest.Mock)
      .mockResolvedValueOnce(mockMovie)
      .mockResolvedValueOnce(mockVideos);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useMovieDetail(mockMovieId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movie).toEqual(mockMovie);
      expect(result.current.error).toBeNull();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should set error when no cache available on error', async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(new Error('API Error'));
    (cacheService.get as jest.Mock).mockResolvedValue(null);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useMovieDetail(mockMovieId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Error loading movie details');
    });

    consoleErrorSpy.mockRestore();
  });

  it('should handle missing trailer', async () => {
    const videosNoTrailer = { results: [] };

    (axiosInstance.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockMovie })
      .mockResolvedValueOnce({ data: videosNoTrailer });
    (cacheService.set as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useMovieDetail(mockMovieId));

    await waitFor(() => {
      expect(result.current.trailerKey).toBeNull();
    });
  });
});
