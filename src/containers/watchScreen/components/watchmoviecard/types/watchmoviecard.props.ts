export interface WatchMovieCardProps {
  posterPath: string;
  title: string;
  rating: number;
  genreIds?: number[];
  releaseDate: string;
  runtime?: number;
  onPress: () => void;
}
