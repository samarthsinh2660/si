import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { GlowingLine } from '../components/GlowingLine';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

type StatItem = {
  label: string;
  value: number;
  suffix: string;
  delay: number;
};

const stats: StatItem[] = [
  { label: 'Factories', value: 10, suffix: '+', delay: 126 },
  { label: 'Pharma Clients', value: 5, suffix: '+', delay: 160 },
  { label: 'AMC Contracts', value: 15, suffix: '+', delay: 194 },
];

export const Scene5FactoryContracts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const smokeFrames = [0, 1, 2].map((i) => ({
    opacity: interpolate(
      (frame + i * 20) % 90,
      [0, 45, 90],
      [0, 0.5, 0],
      { extrapolateRight: 'clamp' }
    ),
    y: interpolate(
      (frame + i * 20) % 90,
      [0, 90],
      [0, -40],
      { extrapolateRight: 'clamp' }
    ),
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
      }}
    >
      <BackgroundParticles count={35} color={COLORS.industrialBlue} direction="up" />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <StaggeredText
          text="Industrial & Factory AMC"
          fontSize={56}
          fontWeight="700"
          color={COLORS.white}
          delay={12}
          staggerDelay={3}
        />

        <GlowingLine width={500} delay={57} duration={50} />

        <div
          style={{
            position: 'relative',
            width: '1100px',
            height: '280px',
            marginTop: '1rem',
          }}
        >
          <svg width="1100" height="280" viewBox="0 0 1100 280">
            <defs>
              <filter id="factoryGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="factoryGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={COLORS.darkBlue} />
                <stop offset="100%" stopColor={COLORS.circuit} />
              </linearGradient>
            </defs>

            {[0, 1, 2].map((i) => {
              const x = 120 + i * 350;
              const factoryDelay = 20 + i * 15;
              const factoryProgress = spring({
                frame: Math.max(0, frame - factoryDelay),
                fps,
                config: SPRING_CONFIGS.smooth,
              });

              const windowPulse = interpolate(
                (frame + i * 10) % 45,
                [0, 22, 45],
                [0.4, 1, 0.4],
                { extrapolateRight: 'clamp' }
              );

              return (
                <g
                  key={i}
                  opacity={interpolate(frame, [factoryDelay, factoryDelay + 20], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  })}
                  transform={`translate(0, ${(1 - factoryProgress) * 50})`}
                >
                  <rect
                    x={x}
                    y="80"
                    width="200"
                    height="150"
                    rx="6"
                    fill="url(#factoryGradient)"
                    stroke={COLORS.industrialBlue}
                    strokeWidth="2"
                  />

                  {[0, 1, 2].map((row) =>
                    [0, 1, 2].map((col) => (
                      <rect
                        key={`${row}-${col}`}
                        x={x + 20 + col * 55}
                        y={100 + row * 40}
                        width="40"
                        height="25"
                        rx="3"
                        fill={COLORS.accentOrange}
                        opacity={windowPulse * (0.5 + Math.random() * 0.5)}
                      />
                    ))
                  )}

                  <rect
                    x={x + 170}
                    y="30"
                    width="25"
                    height="100"
                    rx="3"
                    fill={COLORS.lightGray}
                  />

                  <circle
                    cx={x + 182.5}
                    cy={20 + smokeFrames[i].y}
                    r="15"
                    fill={COLORS.lightGray}
                    opacity={smokeFrames[i].opacity}
                  />
                  <circle
                    cx={x + 175}
                    cy={5 + smokeFrames[i].y}
                    r="10"
                    fill={COLORS.lightGray}
                    opacity={smokeFrames[i].opacity * 0.7}
                  />

                  <rect
                    x={x + 80}
                    y="190"
                    width="40"
                    height="40"
                    rx="4"
                    fill={COLORS.industrialBlue}
                  />

                  <text
                    x={x + 100}
                    y="250"
                    fill={COLORS.gray}
                    fontSize="14"
                    fontFamily={fontFamily}
                    textAnchor="middle"
                  >
                    {['Factory A', 'Factory B', 'Factory C'][i]}
                  </text>
                </g>
              );
            })}

            <path
              d={`M 220 260 L 470 260 L 720 260 L 970 260`}
              stroke={COLORS.industrialBlue}
              strokeWidth="3"
              fill="none"
              strokeDasharray={interpolate(frame, [50, 100], [0, 800], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })}
              opacity={0.5}
              filter="url(#factoryGlow)"
            />

            {[320, 570, 820].map((x, i) => {
              const nodeOpacity = interpolate(
                frame,
                [70 + i * 15, 85 + i * 15],
                [0, 1],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              );

              return (
                <g key={i} opacity={nodeOpacity}>
                  <circle cx={x} cy="260" r="8" fill={COLORS.accentOrange} filter="url(#factoryGlow)" />
                </g>
              );
            })}
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '5rem',
            marginTop: '1.5rem',
          }}
        >
          {stats.map((stat, i) => {
            const cardOpacity = interpolate(
              frame,
              [stat.delay, stat.delay + 15],
              [0, 1],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );

            const cardScale = spring({
              frame: Math.max(0, frame - stat.delay),
              fps,
              config: SPRING_CONFIGS.gentle,
            });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  delay={stat.delay + 10}
                  fontSize={64}
                  duration={40}
                />
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: '600',
                    color: COLORS.lightGray,
                    fontFamily,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '1rem',
            opacity: interpolate(frame, [240, 268], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: '500',
              color: COLORS.gray,
              fontFamily,
            }}
          >
            Reliable IT Infrastructure Support
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
