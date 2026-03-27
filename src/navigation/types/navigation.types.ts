export type RootStackParamList = {
  MainTabs: undefined;
  MovieDetail: {
    movieId: number;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Search: {
    query?: string;
  };
  Watch: undefined;
};
