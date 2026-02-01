import React, { ReactNode } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type SlideInProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
};

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 100,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delayedFrame = Math.max(0, frame - delay);

  const progress = spring({
    frame: delayedFrame,
    fps,
    config: {
      damping: 200,
    },
  });

  const opacity = interpolate(delayedFrame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
  });

  let x = 0;
  let y = 0;

  switch (direction) {
    case 'left':
      x = (1 - progress) * -distance;
      break;
    case 'right':
      x = (1 - progress) * distance;
      break;
    case 'up':
      y = (1 - progress) * distance;
      break;
    case 'down':
      y = (1 - progress) * -distance;
      break;
  }

  return (
    <div
      style={{
        opacity,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>
  );
};
