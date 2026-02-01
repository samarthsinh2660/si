import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
});

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  duration?: number;
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  delay = 0,
  fontSize = 72,
  color = COLORS.accentOrange,
  duration = 60,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delayedFrame = Math.max(0, frame - delay);

  const progress = interpolate(delayedFrame, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const currentValue = Math.round(progress * value);

  const scale = spring({
    frame: delayedFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const opacity = interpolate(delayedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize,
        fontWeight: '800',
        color,
        fontFamily,
        opacity,
        transform: `scale(${scale})`,
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      <span>{prefix}</span>
      <span
        style={{
          minWidth: `${String(value).length * 0.6}em`,
          textAlign: 'center',
        }}
      >
        {currentValue}
      </span>
      <span style={{ fontSize: fontSize * 0.6 }}>{suffix}</span>
    </div>
  );
};
