import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { iconPaths } from './constants/iconPaths';
import { SvgIconProps } from './types/svgicon.interface';

export const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = 24,
  color = '#000',
  fillRule = 'evenodd',
  style,
  width,
  height,
  viewBox = '0 0 24 24',
}) => {
  const path = iconPaths[name];
  const paths = Array.isArray(path) ? path : [path];
  const strokeIcons: string[] = ['search', 'back', 'info', 'clock', 'calendar', 'close'];
  const isStrokeIcon = strokeIcons.includes(name);

  const iconWidth = width || size;
  const iconHeight = height || size;

  if (isStrokeIcon) {
    return (
      <View
        style={[
          styles.container,
          { width: iconWidth, height: iconHeight },
          style,
        ]}
      >
        <Svg
          width={iconWidth}
          height={iconHeight}
          viewBox={viewBox}
          fill="none"
        >
          <G
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths.map((pathData, index) => (
              <Path key={index} d={pathData} />
            ))}
          </G>
        </Svg>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { width: iconWidth, height: iconHeight },
        style,
      ]}
    >
      <Svg
        width={iconWidth}
        height={iconHeight}
        viewBox={viewBox}
        fill="none"
      >
        {paths.map((pathData, index) => (
          <Path
            key={index}
            fillRule={fillRule}
            clipRule={fillRule}
            d={pathData}
            fill={color}
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
