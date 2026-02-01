import React, { ReactNode } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  durationInSeconds?: number;
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  durationInSeconds = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delayedFrame = Math.max(0, frame - delay);
  const duration = durationInSeconds * fps;

  const opacity = interpolate(delayedFrame, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return <div style={{ opacity }}>{children}</div>;
};
