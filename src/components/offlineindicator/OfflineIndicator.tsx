import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { colors } from '@/theme/colors';

export const OfflineIndicator = () => {
  const { isOnline } = useNetworkStatus();

  if (isOnline) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>📵 Offline Mode - Using cached data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent.rating,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});
