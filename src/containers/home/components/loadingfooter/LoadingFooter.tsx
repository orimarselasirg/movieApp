import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles/loadingposter.style';
import { LoadingFooterProps } from './types/loadingposter.props';

export const LoadingFooter: React.FC<LoadingFooterProps> = ({
  isLoading,
  loadingText = 'Cargando más películas...',
}) => {
  if (!isLoading) return null;

  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.footerText}>{loadingText}</Text>
    </View>
  );
};


