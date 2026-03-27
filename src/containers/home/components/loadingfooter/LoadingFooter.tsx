import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '@/theme/colors';
import { styles } from './styles/loadingposter.style';
import { LoadingFooterProps } from './types/loadingposter.props';

export const LoadingFooter: React.FC<LoadingFooterProps> = ({
  isLoading,
  loadingText = 'Loading more movies...',
}) => {
  if (!isLoading) return null;

  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="large" color={colors.text.primary} />
      <Text style={styles.footerText}>{loadingText}</Text>
    </View>
  );
};


