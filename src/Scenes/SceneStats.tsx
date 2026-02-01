import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../config/branding';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { StaggeredText } from '../components/StaggeredText';
import { CircuitBackground } from '../components/CircuitBackground';
import { GlowingLine } from '../components/GlowingLine';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '600'],
  subsets: ['latin'],
});

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  delay: number;
};

const stats: StatItem[] = [
  { value: 20, suffix: '+', label: 'Years Experience', delay: 40 },
  { value: 1000, suffix: '+', label: 'Repairs Done', delay: 74 },
  { value: 15, suffix: '+', label: 'Factory Contracts', delay: 108 },
  { value: 500, suffix: '+', label: 'Happy Clients', delay: 143 },
];

export const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.navy,
      }}
    >
      <CircuitBackground opacity={0.08} />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '3rem',
        }}
      >
        <div
          style={{
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <StaggeredText
            text="Our Track Record"
            fontSize={56}
            fontWeight="700"
            color={COLORS.white}
            delay={12}
            staggerDelay={3}
          />
        </div>

        <GlowingLine width={600} delay={40} duration={50} />

        <div
          style={{
            display: 'flex',
            gap: '4rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '1400px',
          }}
        >
          {stats.map((stat, i) => {
            const cardOpacity = interpolate(
              frame,
              [stat.delay, stat.delay + 15],
              [0, 1],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );

            const cardY = interpolate(
              frame,
              [stat.delay, stat.delay + 20],
              [40, 0],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '2rem 3rem',
                  backgroundColor: `${COLORS.darkBlue}80`,
                  borderRadius: '16px',
                  border: `2px solid ${COLORS.industrialBlue}40`,
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px)`,
                  minWidth: '200px',
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  delay={stat.delay + 10}
                  fontSize={64}
                  duration={50}
                />
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: COLORS.lightGray,
                    fontFamily,
                    textAlign: 'center',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
