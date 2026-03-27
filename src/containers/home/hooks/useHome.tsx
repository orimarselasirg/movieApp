import { useEffect, useState } from "react";
import { Tab } from "../components/tabselector/types/tabselector.interface";
import { Result } from "../types/movies.interface";
import axiosInstance from "@/api/axios";

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

  const getMovies = async () => {
    try {
      setLoading(true);
      const [popularRes, nowPlayingRes, upcomingRes, topRatedRes] =
        await Promise.all([
          axiosInstance.get('/movie/popular'),
          axiosInstance.get('/movie/now_playing', { params: { page: 1 }}),
          axiosInstance.get('/movie/upcoming', { params: { page: 1 }}),
          axiosInstance.get('/movie/top_rated', { params: { page: 1 }}),
        ]);

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
      const response = await axiosInstance.get(endpoint, {
        params: { page: nextPage },
      });

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