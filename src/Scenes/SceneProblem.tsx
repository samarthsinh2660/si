import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
});

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glitchOffset = interpolate(
    (frame % 8),
    [0, 2, 4, 6, 8],
    [0, 4, -3, 2, 0],
    { extrapolateRight: 'clamp' }
  );

  const screenShake = interpolate(
    (frame % 6),
    [0, 2, 4, 6],
    [0, 2, -1, 0],
    { extrapolateRight: 'clamp' }
  );

  const laptopScale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const redPulse = interpolate(
    (frame % 45),
    [0, 22, 45],
    [0.3, 0.7, 0.3],
    { extrapolateRight: 'clamp' }
  );

  const warningOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        transform: `translateX(${screenShake}px)`,
      }}
    >
      <BackgroundParticles count={20} color={COLORS.danger} direction="down" />

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 50%, ${COLORS.danger}20 0%, transparent 70%)`,
          opacity: redPulse,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          style={{
            transform: `scale(${laptopScale})`,
          }}
        >
          <svg width="400" height="280" viewBox="0 0 400 280">
            <rect
              x="50"
              y="20"
              width="300"
              height="180"
              rx="10"
              fill={COLORS.darkBlue}
              stroke={COLORS.danger}
              strokeWidth="3"
            />

            <rect
              x="70"
              y="40"
              width="260"
              height="140"
              rx="5"
              fill={COLORS.dark}
            />

            <g opacity={redPulse}>
              <line
                x1="100"
                y1="80"
                x2={200 + glitchOffset}
                y2="80"
                stroke={COLORS.danger}
                strokeWidth="3"
              />
              <line
                x1="150"
                y1="110"
                x2={250 + glitchOffset * -1}
                y2="110"
                stroke={COLORS.danger}
                strokeWidth="3"
              />
              <line
                x1="120"
                y1="140"
                x2={220 + glitchOffset}
                y2="140"
                stroke={COLORS.danger}
                strokeWidth="3"
              />
            </g>

            <text
              x="200"
              y="120"
              fill={COLORS.danger}
              fontSize="40"
              fontFamily={fontFamily}
              fontWeight="800"
              textAnchor="middle"
              opacity={warningOpacity}
            >
              ERROR
            </text>

            <rect
              x="50"
              y="210"
              width="300"
              height="15"
              rx="7"
              fill={COLORS.darkBlue}
              stroke={COLORS.danger}
              strokeWidth="2"
            />

            <circle cx="80" cy="230" r="2" fill={COLORS.danger} opacity={redPulse} />
            <circle cx="95" cy="230" r="2" fill={COLORS.danger} opacity={redPulse * 0.5} />

            <text
              x="200"
              y="255"
              fill={COLORS.danger}
              fontSize="14"
              fontFamily={fontFamily}
              textAnchor="middle"
              opacity={warningOpacity}
            >
              SYSTEM FAILURE
            </text>
          </svg>
        </div>

        <div
          style={{
            opacity: interpolate(frame, [51, 74], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <StaggeredText
            text="System Down?"
            fontSize={72}
            fontWeight="800"
            color={COLORS.danger}
            delay={51}
            staggerDelay={3}
          />
        </div>

        <div
          style={{
            fontSize: 28,
            color: COLORS.lightGray,
            fontFamily,
            opacity: interpolate(frame, [91, 120], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          Hardware failures happen. We fix them.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
