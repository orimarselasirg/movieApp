import { useEffect, useState } from "react";
import { Tab } from "../components/tabselector/types/tabselector.interface";
import { Result } from "../types/movies.interface";
import axiosInstance from "@/api/axios";
import { cacheService } from "@/services/cache.service";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export const useHome = () => {

  type TabType = 'now_playing' | 'upcoming' | 'top_rated';

  const TABS: Tab<TabType>[] = [
    { key: 'now_playing', label: 'Now playing' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'top_rated', label: 'Top rated' },
  ];
  const [popularMovies, setPopularMovies] = useState<Result[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Result[]>([]);
  const [upcoming, setUpcoming] = useState<Result[]>([]);
  const [topRated, setTopRated] = useState<Result[]>([]);
  const [selectedTab, setSelectedTab] = useState<TabType>("now_playing");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nowPlayingPage, setNowPlayingPage] = useState<number>(1);
  const [upcomingPage, setUpcomingPage] = useState<number>(1);
  const [topRatedPage, setTopRatedPage] = useState<number>(1);
  const [hasMoreNowPlaying, setHasMoreNowPlaying] = useState<boolean>(true);
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState<boolean>(true);
  const [hasMoreTopRated, setHasMoreTopRated] = useState<boolean>(true);
  const { isOnline } = useNetworkStatus();

  const getMovies = async () => {
    try {
      setLoading(true);

      if (!isOnline) {
        const cachedPopular = await cacheService.get('movies:popular:1');
        const cachedNowPlaying = await cacheService.get('movies:now_playing:1');
        const cachedUpcoming = await cacheService.get('movies:upcoming:1');
        const cachedTopRated = await cacheService.get('movies:top_rated:1');

        if (cachedPopular && cachedNowPlaying && cachedUpcoming && cachedTopRated) {
          setPopularMovies((cachedPopular as any).results.slice(0, 5));
          setNowPlaying((cachedNowPlaying as any).results);
          setUpcoming((cachedUpcoming as any).results);
          setTopRated((cachedTopRated as any).results);
          setLoading(false);
          return;
        }
      }

      const [popularRes, nowPlayingRes, upcomingRes, topRatedRes] =
        await Promise.all([
          axiosInstance.get('/movie/popular'),
          axiosInstance.get('/movie/now_playing', { params: { page: 1 }}),
          axiosInstance.get('/movie/upcoming', { params: { page: 1 }}),
          axiosInstance.get('/movie/top_rated', { params: { page: 1 }}),
        ]);

      await cacheService.set('movies:popular:1', popularRes.data);
      await cacheService.set('movies:now_playing:1', nowPlayingRes.data);
      await cacheService.set('movies:upcoming:1', upcomingRes.data);
      await cacheService.set('movies:top_rated:1', topRatedRes.data);

      setPopularMovies(popularRes.data.results.slice(0, 5));
      setNowPlaying(nowPlayingRes.data.results);
      setUpcoming(upcomingRes.data.results);
      setTopRated(topRatedRes.data.results);

      setHasMoreNowPlaying(nowPlayingRes.data.page < nowPlayingRes.data.total_pages);
      setHasMoreUpcoming(upcomingRes.data.page < upcomingRes.data.total_pages);
      setHasMoreTopRated(topRatedRes.data.page < topRatedRes.data.total_pages);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);

      const cachedPopular = await cacheService.get('movies:popular:1');
      const cachedNowPlaying = await cacheService.get('movies:now_playing:1');
      const cachedUpcoming = await cacheService.get('movies:upcoming:1');
      const cachedTopRated = await cacheService.get('movies:top_rated:1');

      if (cachedPopular && cachedNowPlaying && cachedUpcoming && cachedTopRated) {
        setPopularMovies((cachedPopular as any).results.slice(0, 5));
        setNowPlaying((cachedNowPlaying as any).results);
        setUpcoming((cachedUpcoming as any).results);
        setTopRated((cachedTopRated as any).results);
      }

      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (loadingMore) return;

    let hasMore = false;
    let currentPage = 1;
    let endpoint = '';

    switch (selectedTab) {
      case 'now_playing':
        hasMore = hasMoreNowPlaying;
        currentPage = nowPlayingPage;
        endpoint = '/movie/now_playing';
        break;
      case 'upcoming':
        hasMore = hasMoreUpcoming;
        currentPage = upcomingPage;
        endpoint = '/movie/upcoming';
        break;
      case 'top_rated':
        hasMore = hasMoreTopRated;
        currentPage = topRatedPage;
        endpoint = '/movie/top_rated';
        break;
    }

    if (!hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const cacheKey = `movies:${endpoint.split('/').pop()}:${nextPage}`;

      if (!isOnline) {
        const cachedData = await cacheService.get(cacheKey);
        if (cachedData) {
          const newMovies = (cachedData as any).results;
          const hasMorePages = (cachedData as any).page < (cachedData as any).total_pages;

          switch (selectedTab) {
            case 'now_playing':
              setNowPlaying((prev) => [...prev, ...newMovies]);
              setNowPlayingPage(nextPage);
              setHasMoreNowPlaying(hasMorePages);
              break;
            case 'upcoming':
              setUpcoming((prev) => [...prev, ...newMovies]);
              setUpcomingPage(nextPage);
              setHasMoreUpcoming(hasMorePages);
              break;
            case 'top_rated':
              setTopRated((prev) => [...prev, ...newMovies]);
              setTopRatedPage(nextPage);
              setHasMoreTopRated(hasMorePages);
              break;
          }

          setLoadingMore(false);
          return;
        }
      }

      const response = await axiosInstance.get(endpoint, {
        params: { page: nextPage },
      });

      await cacheService.set(cacheKey, response.data);

      const newMovies = response.data.results;
      const hasMorePages = response.data.page < response.data.total_pages;

      switch (selectedTab) {
        case 'now_playing':
          setNowPlaying((prev) => [...prev, ...newMovies]);
          setNowPlayingPage(nextPage);
          setHasMoreNowPlaying(hasMorePages);
          break;
        case 'upcoming':
          setUpcoming((prev) => [...prev, ...newMovies]);
          setUpcomingPage(nextPage);
          setHasMoreUpcoming(hasMorePages);
          break;
        case 'top_rated':
          setTopRated((prev) => [...prev, ...newMovies]);
          setTopRatedPage(nextPage);
          setHasMoreTopRated(hasMorePages);
          break;
      }

      setLoadingMore(false);
    } catch (error) {
      console.error('Error loading more movies:', error);

      const nextPage = currentPage + 1;
      const cacheKey = `movies:${endpoint.split('/').pop()}:${nextPage}`;
      const cachedData = await cacheService.get(cacheKey);

      if (cachedData) {
        const newMovies = (cachedData as any).results;
        const hasMorePages = (cachedData as any).page < (cachedData as any).total_pages;

        switch (selectedTab) {
          case 'now_playing':
            setNowPlaying((prev) => [...prev, ...newMovies]);
            setNowPlayingPage(nextPage);
            setHasMoreNowPlaying(hasMorePages);
            break;
          case 'upcoming':
            setUpcoming((prev) => [...prev, ...newMovies]);
            setUpcomingPage(nextPage);
            setHasMoreUpcoming(hasMorePages);
            break;
          case 'top_rated':
            setTopRated((prev) => [...prev, ...newMovies]);
            setTopRatedPage(nextPage);
            setHasMoreTopRated(hasMorePages);
            break;
        }
      }

      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const getSelectedMovies = () => {
    switch (selectedTab) {
      case 'now_playing':
        return nowPlaying;
      case 'upcoming':
        return upcoming;
      case 'top_rated':
        return topRated;
      default:
        return nowPlaying;
    }
  };

  return {
    TABS,
    loadMoreMovies,
    getSelectedMovies,
    popularMovies,
    setSelectedTab,
    loading,
    loadingMore,
    selectedTab
  }

}