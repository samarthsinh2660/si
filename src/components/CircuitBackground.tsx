import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../config/branding';

type CircuitBackgroundProps = {
  opacity?: number;
  animate?: boolean;
  color?: string;
};

export const CircuitBackground: React.FC<CircuitBackgroundProps> = ({
  opacity = 0.15,
  animate = true,
  color = COLORS.industrialBlue,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const progress = animate
    ? interpolate(frame, [0, 2 * fps], [0, 1], { extrapolateRight: 'clamp' })
    : 1;

  const glowPulse = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.3, 0.8, 0.3],
    { extrapolateRight: 'clamp' }
  );

  const horizontalLines = [200, 400, 540, 680, 880];
  const verticalLines = [300, 600, 960, 1320, 1620];

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity,
      }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {horizontalLines.map((y, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={y}
          x2={width * progress}
          y2={y}
          stroke={color}
          strokeWidth="1"
          opacity={glowPulse}
          filter="url(#glow)"
        />
      ))}

      {verticalLines.map((x, i) => (
        <line
          key={`v-${i}`}
          x1={x}
          y1="0"
          x2={x}
          y2={height * progress}
          stroke={color}
          strokeWidth="1"
          opacity={glowPulse * 0.7}
          filter="url(#glow)"
        />
      ))}

      {horizontalLines.map((y, i) =>
        verticalLines.map((x, j) => {
          const nodeDelay = (i + j) * 5;
          const nodeOpacity = interpolate(
            frame,
            [nodeDelay, nodeDelay + 15],
            [0, 1],
            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
          );
          const nodePulse = interpolate(
            (frame + nodeDelay) % 60,
            [0, 30, 60],
            [0.5, 1, 0.5],
            { extrapolateRight: 'clamp' }
          );

          return (
            <g key={`node-${i}-${j}`}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={COLORS.accentOrange}
                opacity={nodeOpacity * nodePulse}
                filter="url(#glow)"
              />
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="none"
                stroke={COLORS.accentOrange}
                strokeWidth="1"
                opacity={nodeOpacity * nodePulse * 0.5}
              />
            </g>
          );
        })
      )}
    </svg>
  );
};
