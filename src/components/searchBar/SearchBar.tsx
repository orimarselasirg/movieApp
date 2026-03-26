import { Text, View, StyleSheet, TextInput } from "react-native"

export const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#67686D"
      />
      <Text style={styles.searchIcon}>🔍</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2B35',
    marginHorizontal: 20,
    marginVertical: 10,
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