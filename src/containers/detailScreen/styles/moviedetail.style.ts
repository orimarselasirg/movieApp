import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
  },
  overviewContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});
