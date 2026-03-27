import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axios';

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export const useMovieDetail = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);

        const movieResponse = await axiosInstance.get(`/movie/${movieId}`);
        setMovie(movieResponse.data);

        const videosResponse = await axiosInstance.get(`/movie/${movieId}/videos`);
        const videos: MovieVideo[] = videosResponse.data.results || [];

        const trailer = videos.find(
          (video) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer' &&
            video.official === true
        ) || videos.find(
          (video) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer'
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching movie detail:', err);
        setError('Error loading movie details');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  return {
    movie,
    trailerKey,
    loading,
    error,
  };
};
