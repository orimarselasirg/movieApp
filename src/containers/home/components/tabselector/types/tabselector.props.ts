import { TextStyle, ViewStyle } from "react-native";
import { Tab } from "./tabselector.interface";

export interface TabSelectorProps<T extends string> {
  tabs: Tab<T>[];
  selectedTab: T;
  onSelectTab: (tab: T) => void;
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  tabActiveStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  tabTextActiveStyle?: TextStyle;
}