import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface CachedImageProps extends Omit<FastImageProps, 'source'> {
  uri: string;
}

export const CachedImage: React.FC<CachedImageProps> = ({ uri, ...props }) => {
  return (
    <FastImage
      {...props}
      source={{
        uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
    />
  );
};
