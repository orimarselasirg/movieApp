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

export const useMovieDetail = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/movie/${movieId}`);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching movie detail:', err);
        setError('Error al cargar los detalles de la película');
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
    loading,
    error,
  };
};
