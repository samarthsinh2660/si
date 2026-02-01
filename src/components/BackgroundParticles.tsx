import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../config/branding';

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
};

type BackgroundParticlesProps = {
  count?: number;
  color?: string;
  maxSize?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
};

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({
  count = 50,
  color = COLORS.industrialBlue,
  maxSize = 4,
  direction = 'up',
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = useMemo(() => {
    const result: Particle[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * maxSize + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        delay: Math.random() * 60,
      });
    }
    return result;
  }, [count, width, height, maxSize]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((particle, i) => {
        const delayedFrame = Math.max(0, frame - particle.delay);
        const movement = delayedFrame * particle.speed;

        let x = particle.x;
        let y = particle.y;

        switch (direction) {
          case 'up':
            y = (particle.y - movement) % height;
            if (y < 0) y += height;
            break;
          case 'down':
            y = (particle.y + movement) % height;
            break;
          case 'left':
            x = (particle.x - movement) % width;
            if (x < 0) x += width;
            break;
          case 'right':
            x = (particle.x + movement) % width;
            break;
        }

        const pulse = interpolate(
          (frame + i * 10) % 60,
          [0, 30, 60],
          [0.5, 1, 0.5],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: particle.opacity * pulse,
              boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
