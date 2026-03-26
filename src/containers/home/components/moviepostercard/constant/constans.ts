import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');
export const POSTER_WIDTH = (width - 60) / 3;
export const POSTER_HEIGHT = POSTER_WIDTH * 1.5;