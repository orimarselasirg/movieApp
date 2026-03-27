import { Text, View, TextInput } from "react-native"
import { SvgIcon } from "../svgicon";
import { styles } from "./styles/searchbar.style";
import { SearchBarProps } from "./types/searchbar.props";


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