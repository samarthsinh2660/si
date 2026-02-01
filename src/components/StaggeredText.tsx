import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700', '800'],
  subsets: ['latin'],
});

type StaggeredTextProps = {
  text: string;
  delay?: number;
  staggerDelay?: number;
  fontSize?: number;
  fontWeight?: '600' | '700' | '800';
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
};

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  delay = 0,
  staggerDelay = 2,
  fontSize = 64,
  fontWeight = '700',
  color = COLORS.white,
  direction = 'up',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const letters = text.split('');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {letters.map((letter, i) => {
        const letterDelay = delay + i * staggerDelay;
        const delayedFrame = Math.max(0, frame - letterDelay);

        const progress = spring({
          frame: delayedFrame,
          fps,
          config: SPRING_CONFIGS.gentle,
        });

        const opacity = interpolate(delayedFrame, [0, 20], [0, 1], {
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });

        let transform = '';
        const distance = 40;
        switch (direction) {
          case 'up':
            transform = `translateY(${(1 - progress) * distance}px)`;
            break;
          case 'down':
            transform = `translateY(${(1 - progress) * -distance}px)`;
            break;
          case 'left':
            transform = `translateX(${(1 - progress) * distance}px)`;
            break;
          case 'right':
            transform = `translateX(${(1 - progress) * -distance}px)`;
            break;
        }

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontSize,
              fontWeight,
              color,
              fontFamily,
              opacity,
              transform,
              whiteSpace: letter === ' ' ? 'pre' : 'normal',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </div>
  );
};
