import React from 'react';
import { FlatList } from 'react-native';
import { SearchBar } from '@/components/searchBar/SearchBar';
import { Title } from '@/components/Title/Title';
import { TabSelector } from '../tabselector/TabSelector';
import { HomeHeaderProps } from './types/homeheader.props';
import { styles } from './styles/homeheader.style';

export function HomeHeader<T extends string, ItemT>({
  title,
  popularMovies,
  renderFeaturedMovie,
  featuredWidth,
  tabs,
  selectedTab,
  onSelectTab,
}: Readonly<HomeHeaderProps<T, ItemT>>) {
  return (
    <>
      <Title title={title} />

      <SearchBar />

      <FlatList
        data={popularMovies}
        renderItem={renderFeaturedMovie}
        keyExtractor={(item: any) => `featured-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
        snapToInterval={featuredWidth + 20}
        decelerationRate="fast"
      />

      <TabSelector
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={onSelectTab}
      />
    </>
  );
}
