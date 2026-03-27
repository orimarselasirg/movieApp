import { renderHook, waitFor } from '@testing-library/react-native';
import { useNetworkStatus } from '../useNetworkStatus';
import NetInfo from '@react-native-community/netinfo';

jest.mock('@react-native-community/netinfo');

describe('useNetworkStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial online state', async () => {
    const mockNetInfo = {
      isConnected: true,
      isInternetReachable: true,
    };

    (NetInfo.fetch as jest.Mock).mockResolvedValue(mockNetInfo);
    (NetInfo.addEventListener as jest.Mock).mockReturnValue(() => {});

    const { result } = renderHook(() => useNetworkStatus());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
      expect(result.current.isInternetReachable).toBe(true);
      expect(result.current.isOnline).toBe(true);
    });
  });

  it('should return offline state when not connected', async () => {
    const mockNetInfo = {
      isConnected: false,
      isInternetReachable: false,
    };

    (NetInfo.fetch as jest.Mock).mockResolvedValue(mockNetInfo);
    (NetInfo.addEventListener as jest.Mock).mockReturnValue(() => {});

    const { result } = renderHook(() => useNetworkStatus());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(false);
      expect(result.current.isOnline).toBe(false);
    });
  });

  it('should cleanup listener on unmount', () => {
    const unsubscribe = jest.fn();
    (NetInfo.addEventListener as jest.Mock).mockReturnValue(unsubscribe);
    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
    });

    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
