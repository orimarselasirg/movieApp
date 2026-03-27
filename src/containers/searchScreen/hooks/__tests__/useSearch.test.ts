import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useSearch } from '../useSearch';
import axiosInstance from '@/api/axios';
import { cacheService } from '@/services/cache.service';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

jest.mock('@/api/axios');
jest.mock('@/services/cache.service');
jest.mock('@/hooks/useNetworkStatus');

describe('useSearch', () => {
  const mockSearchResults = {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Test Movie 1',
        poster_path: '/test1.jpg',
        vote_average: 8.5,
        genre_ids: [28],
        release_date: '2023-01-01',
        adult: false,
        backdrop_path: '/backdrop1.jpg',
        original_language: 'en',
        original_title: 'Test Movie 1',
        overview: 'Test overview',
        popularity: 100,
        video: false,
        vote_count: 1000,
      },
    ],
    total_pages: 5,
    total_results: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('should search movies with debounce', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockSearchResults,
    });
    (cacheService.set as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleSearch('test movie');
    });

    expect(result.current.searchQuery).toBe('test movie');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(result.current.searchResults).toEqual(mockSearchResults.results);
      expect(result.current.loading).toBe(false);
    });

    expect(axiosInstance.get).toHaveBeenCalledWith('/search/movie', {
      params: {
        query: 'test movie',
        page: 1,
      },
    });
  });

  it('should clear results when search query is empty', async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleSearch('');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(result.current.searchResults).toEqual([]);
    });
  });

  it('should use cache when offline', async () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: false });
    (cacheService.get as jest.Mock).mockResolvedValue(mockSearchResults);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleSearch('test movie');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(result.current.searchResults).toEqual(mockSearchResults.results);
    });

    expect(axiosInstance.get).not.toHaveBeenCalled();
    expect(cacheService.get).toHaveBeenCalledWith('search:test movie:1');
  });

  it('should handle search error and fallback to cache', async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('Search failed')
    );
    (cacheService.get as jest.Mock).mockResolvedValue(mockSearchResults);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleSearch('test movie');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(result.current.searchResults).toEqual(mockSearchResults.results);
    });

    consoleErrorSpy.mockRestore();
  });

  it('should debounce rapid search queries', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockSearchResults,
    });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleSearch('t');
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    act(() => {
      result.current.handleSearch('te');
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    act(() => {
      result.current.handleSearch('test');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    });
  });
});
