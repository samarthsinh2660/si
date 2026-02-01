import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../config/branding';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

type AnimatedTextProps = {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700' | '800';
  color?: string;
  align?: 'left' | 'center' | 'right';
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  fontWeight = '700',
  color = COLORS.white,
  align = 'center',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayedFrame = Math.max(0, frame - delay);

  const opacity = interpolate(delayedFrame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame: delayedFrame,
    fps,
    config: {
      damping: 200,
    },
  });

  const y = interpolate(delayedFrame, [0, 0.6 * fps], [30, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        fontSize,
        fontWeight,
        color,
        fontFamily,
        textAlign: align,
      }}
    >
      {text}
    </div>
  );
};
