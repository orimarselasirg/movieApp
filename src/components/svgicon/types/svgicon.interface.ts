import { ViewStyle } from 'react-native';

export type IconName =
  | 'home'
  | 'search'
  | 'bookmark'
  | 'back'
  | 'info'
  | 'star'
  | 'clock'
  | 'calendar'
  | 'play'
  | 'close'
  | 'ticket';

export interface SvgIconProps {
  name: IconName;
  size?: number;
  color?: string;
  fillRule?: 'evenodd' | 'nonzero';
  style?: ViewStyle;
  width?: number;
  height?: number;
  viewBox?: string;
}
