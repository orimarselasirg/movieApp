import { StyleSheet } from "react-native";
import { FEATURED_HEIGHT, FEATURED_WIDTH } from "../constant/constant";

export  const styles = StyleSheet.create({
  featuredCard: {
    width: FEATURED_WIDTH,
    height: FEATURED_HEIGHT,
    marginRight: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  featuredNumber: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredNumberText: {
    color: '#3A3F47',
    fontSize: 80,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});