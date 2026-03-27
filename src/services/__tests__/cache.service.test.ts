import AsyncStorage from '@react-native-async-storage/async-storage';
import { cacheService } from '../cache.service';

jest.mock('@react-native-async-storage/async-storage');

describe('cacheService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('set', () => {
    it('should save data to cache with timestamp', async () => {
      const testData = { name: 'Test Movie' };
      const testKey = 'test-key';

      await cacheService.set(testKey, testData);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@movieapp:cache:test-key',
        expect.stringContaining('"name":"Test Movie"')
      );
    });

    it('should handle set error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Set failed'));

      await cacheService.set('test', { data: 'test' });

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('get', () => {
    it('should retrieve valid cached data', async () => {
      const testData = { name: 'Test Movie' };
      const cacheItem = {
        data: testData,
        timestamp: Date.now(),
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(cacheItem)
      );

      const result = await cacheService.get('test-key');

      expect(result).toEqual(testData);
    });

    it('should return null for expired cache', async () => {
      const testData = { name: 'Test Movie' };
      const cacheItem = {
        data: testData,
        timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(cacheItem)
      );

      const result = await cacheService.get('test-key');

      expect(result).toBeNull();
      expect(AsyncStorage.removeItem).toHaveBeenCalled();
    });

    it('should return null for non-existent cache', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await cacheService.get('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove cache item', async () => {
      await cacheService.remove('test-key');

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        '@movieapp:cache:test-key'
      );
    });
  });

  describe('clear', () => {
    it('should clear all cache items', async () => {
      const mockKeys = [
        '@movieapp:cache:key1',
        '@movieapp:cache:key2',
        '@other:key',
      ];

      (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(mockKeys);
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);

      await cacheService.clear();

      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(2);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        '@movieapp:cache:key1'
      );
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        '@movieapp:cache:key2'
      );
    });
  });
});
