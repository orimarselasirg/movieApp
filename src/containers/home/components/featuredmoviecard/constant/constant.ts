import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');
export const FEATURED_WIDTH = width * 0.6;
export const FEATURED_HEIGHT = FEATURED_WIDTH * 1.5;