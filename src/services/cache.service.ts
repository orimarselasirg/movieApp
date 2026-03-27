import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@movieapp:cache:';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const cacheService = {
  async set<T>(key: string, data: T): Promise<void> {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(
        `${CACHE_PREFIX}${key}`,
        JSON.stringify(cacheItem)
      );
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!item) return null;

      const cacheItem: CacheItem<T> = JSON.parse(item);
      const isExpired = Date.now() - cacheItem.timestamp > CACHE_EXPIRATION;

      if (isExpired) {
        await this.remove(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } catch (error) {
      console.error('Error removing cache:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));
      await Promise.all(cacheKeys.map((key) => AsyncStorage.removeItem(key)));
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
};
