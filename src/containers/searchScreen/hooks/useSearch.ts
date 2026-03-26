import { useState, useCallback, useEffect, useRef } from 'react';
import axiosInstance from '@/api/axios';
import { SearchMovie, SearchResponse } from '../types/search.interface';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const searchMovies = useCallback(
    async (query: string, page: number = 1) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response = await axiosInstance.get<SearchResponse>(
          '/search/movie',
          {
            params: {
              query: query.trim(),
              page,
            },
          }
        );

        const newResults = response.data.results;

        if (page === 1) {
          setSearchResults(newResults);
        } else {
          setSearchResults((prev) => [...prev, ...newResults]);
        }

        setCurrentPage(page);
        setHasMore(response.data.page < response.data.total_pages);
        setLoading(false);
        setLoadingMore(false);
      } catch (error) {
        console.error('Error searching movies:', error);
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setCurrentPage(1);
        setHasMore(true);
        searchMovies(query, 1);
      }, 500);
    },
    [searchMovies]
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const loadMoreResults = useCallback(() => {
    if (!loadingMore && hasMore && searchQuery.trim()) {
      searchMovies(searchQuery, currentPage + 1);
    }
  }, [loadingMore, hasMore, searchQuery, currentPage, searchMovies]);

  return {
    searchQuery,
    searchResults,
    loading,
    loadingMore,
    hasMore,
    handleSearch,
    loadMoreResults,
  };
};
