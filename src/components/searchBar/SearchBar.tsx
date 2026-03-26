import { Text, View, StyleSheet, TextInput } from "react-native"
import { SvgIcon } from "../svgicon";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search",
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#67686D"
        value={value}
        onChangeText={onChangeText}
      />
      <Text style={styles.searchIcon}>
        <SvgIcon
          name="search"
          color="#67686D"
          size={26}
        />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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