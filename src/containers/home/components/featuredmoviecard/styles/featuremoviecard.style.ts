import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { FEATURED_HEIGHT, FEATURED_WIDTH } from "../constant/constant";

export  const styles = StyleSheet.create({
  featuredCard: {
    width: FEATURED_WIDTH,
    height: FEATURED_HEIGHT,
    marginRight: 20,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
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
    bottom: -1,
    left: -15,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "visible",
  },
  featuredNumberText: {
    color: colors.background.secondary,
    fontSize: 90,
    fontWeight: '900',
    position: 'absolute',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});