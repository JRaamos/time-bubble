import React from 'react';

import { Overlay, SplashArtwork } from './styled';

export default function LaunchSplash({ opacity }) {
  return (
    <Overlay opacity={opacity}>
      <SplashArtwork />
    </Overlay>
  );
}
