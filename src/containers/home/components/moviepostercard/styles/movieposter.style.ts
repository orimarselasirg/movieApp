import { StyleSheet } from "react-native";
import { POSTER_HEIGHT, POSTER_WIDTH } from "../constant/constans";

export const styles = StyleSheet.create({
  posterCard: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
});