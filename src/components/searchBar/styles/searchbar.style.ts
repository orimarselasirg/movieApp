import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#3A3F47',
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 50,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
})