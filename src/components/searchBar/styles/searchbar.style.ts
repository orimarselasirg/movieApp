import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 50,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
})