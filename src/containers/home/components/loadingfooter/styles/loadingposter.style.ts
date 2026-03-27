import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  footerText: {
    color: colors.text.inactive,
    fontSize: 14,
    marginTop: 10,
  },
});