import { ListRenderItem } from "react-native";
import { Tab } from "../../tabselector/TabSelector";

export interface HomeHeaderProps<T extends string, ItemT> {
  title: string;
  popularMovies: ItemT[];
  renderFeaturedMovie: ListRenderItem<ItemT>;
  featuredWidth: number;
  tabs: Tab<T>[];
  selectedTab: T;
  onSelectTab: (tab: T) => void;
}