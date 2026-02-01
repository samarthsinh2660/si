import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS } from '../config/branding';

type GlowingLineProps = {
  width?: number;
  delay?: number;
  duration?: number;
  color?: string;
  height?: number;
};

export const GlowingLine: React.FC<GlowingLineProps> = ({
  width = 400,
  delay = 0,
  duration = 30,
  color = COLORS.accentOrange,
  height = 4,
}) => {
  const frame = useCurrentFrame();
  const delayedFrame = Math.max(0, frame - delay);

  const progress = interpolate(delayedFrame, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const glowPulse = interpolate(
    (frame % 60),
    [0, 30, 60],
    [0.5, 1, 0.5],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: width * progress,
        height,
        background: `linear-gradient(90deg, ${COLORS.industrialBlue}, ${color})`,
        borderRadius: height / 2,
        boxShadow: `0 0 ${20 * glowPulse}px ${color}, 0 0 ${40 * glowPulse}px ${COLORS.industrialBlue}`,
        opacity: interpolate(delayedFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
      }}
    />
  );
};
