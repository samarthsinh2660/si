import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { GlowingLine } from '../components/GlowingLine';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700', '800'],
  subsets: ['latin'],
});

export const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkScale = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const greenGlow = interpolate(
    (frame % 60),
    [0, 30, 60],
    [0.4, 0.9, 0.4],
    { extrapolateRight: 'clamp' }
  );

  const toolRotation = interpolate(frame, [35, 70], [0, 360], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const repairProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
      }}
    >
      <BackgroundParticles count={40} color={COLORS.success} direction="up" />

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 50%, ${COLORS.success}15 0%, transparent 60%)`,
          opacity: greenGlow,
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
        <div style={{ position: 'relative' }}>
          <svg width="400" height="280" viewBox="0 0 400 280">
            <rect
              x="50"
              y="20"
              width="300"
              height="180"
              rx="10"
              fill={COLORS.darkBlue}
              stroke={COLORS.success}
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

            <g transform={`translate(200, 110) scale(${checkScale})`}>
              <circle
                cx="0"
                cy="0"
                r="40"
                fill={COLORS.success}
                opacity={0.2}
              />
              <path
                d="M -20 0 L -5 15 L 25 -15"
                stroke={COLORS.success}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={`${70 * repairProgress}, 70`}
              />
            </g>

            <rect
              x="50"
              y="210"
              width="300"
              height="15"
              rx="7"
              fill={COLORS.darkBlue}
              stroke={COLORS.success}
              strokeWidth="2"
            />

            <rect
              x="54"
              y="214"
              width={292 * repairProgress}
              height="7"
              rx="3"
              fill={COLORS.success}
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              top: 60,
              right: -20,
              transform: `rotate(${toolRotation}deg)`,
              opacity: interpolate(frame, [35, 50], [0, 1], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              }),
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <rect
                x="25"
                y="5"
                width="10"
                height="40"
                rx="2"
                fill={COLORS.accentOrange}
              />
              <polygon
                points="30,45 20,55 40,55"
                fill={COLORS.lightGray}
              />
            </svg>
          </div>
        </div>

        <div
          style={{
            opacity: interpolate(frame, [46, 68], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <StaggeredText
            text="We Fix It Fast"
            fontSize={72}
            fontWeight="800"
            color={COLORS.success}
            delay={46}
            staggerDelay={3}
          />
        </div>

        <GlowingLine width={500} delay={80} color={COLORS.success} duration={40} />

        <div
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '1rem',
            opacity: interpolate(frame, [91, 120], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          {['Expert Repair', 'Fast Service', 'Warranty'].map((text, i) => (
            <div
              key={i}
              style={{
                fontSize: 24,
                color: COLORS.lightGray,
                fontFamily,
                fontWeight: '600',
                padding: '0.75rem 1.5rem',
                border: `2px solid ${COLORS.success}40`,
                borderRadius: '8px',
                transform: `translateY(${interpolate(
                  frame,
                  [85 + i * 8, 105 + i * 8],
                  [20, 0],
                  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                )}px)`,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
