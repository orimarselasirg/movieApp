import { Text, View, TextInput } from "react-native"
import { SvgIcon } from "../svgicon";
import { styles } from "./styles/searchbar.style";
import { SearchBarProps } from "./types/searchbar.props";
import { colors } from "@/theme/colors";


export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmitEditing,
  placeholder = "Search",
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.text.inactive}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
      />
      <Text style={styles.searchIcon}>
        <SvgIcon
          name="search"
          color={colors.text.inactive}
          size={26}
        />
      </Text>
    </View>
  );
}