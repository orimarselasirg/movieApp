import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.background.secondary,
  },
  tabText: {
    color: colors.text.inactive,
    fontSize: 16,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.text.primary,
  },
});