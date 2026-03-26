import { StyleSheet } from "react-native";

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
    borderBottomColor: '#3A3F47',
  },
  tabText: {
    color: '#67686D',
    fontSize: 16,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
});