import React from 'react';
import { View, Text, Image } from 'react-native';
import { SvgIcon } from '@/components/svgicon';
import { colors } from '@/theme/colors';
import { styles } from './styles/emptystate.style';

interface EmptyStateProps {
  loading: boolean;
  searchQuery: string;
  hasResults: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  loading,
  searchQuery,
  hasResults,
}) => {
  if (loading) return null;

  if (!searchQuery) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>
          <SvgIcon name="search" size={80} color={colors.text.primary} />
        </Text>
        <Text style={styles.emptyText}>
          Search your favorite movies
        </Text>
      </View>
    );
  }

  if (!hasResults) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('../../../../assets/no_result.png')}
          style={styles.emptyImage}
        />
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyText}>
            We are sorry, we can not find the movie :(
          </Text>
        </View>
        <View style={styles.emptyTextContainer2}>
          <Text style={styles.emptyText2}>
            Find your movie by Type title, categories, years, etc
          </Text>
        </View>
      </View>
    );
  }

  return null;
};
