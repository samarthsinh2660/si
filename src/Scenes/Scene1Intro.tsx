import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { COLORS, BRAND, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { GlowingLine } from '../components/GlowingLine';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '700', '800'],
  subsets: ['latin'],
});

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const zoomIn = interpolate(frame, [0, 150], [1, 1.08], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const circuitOpacity = interpolate(frame, [0, 45], [0, 0.2], {
    extrapolateRight: 'clamp',
  });

  const circuitProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const glowPulse = interpolate(
    (frame % 90),
    [0, 45, 90],
    [0.3, 0.7, 0.3],
    { extrapolateRight: 'clamp' }
  );

  const logoScale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const ringRotation = interpolate(frame, [0, 180], [0, 360], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        transform: `scale(${zoomIn})`,
      }}
    >
      <BackgroundParticles count={50} color={COLORS.industrialBlue} />

      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          opacity: circuitOpacity,
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={150 + i * 200}
            x2={width * circuitProgress}
            y2={150 + i * 200}
            stroke={COLORS.circuit}
            strokeWidth="1"
            opacity={glowPulse}
            filter="url(#glow)"
          />
        ))}

        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v-${i}`}
            x1={200 + i * 300}
            y1="0"
            x2={200 + i * 300}
            y2={height * circuitProgress}
            stroke={COLORS.circuit}
            strokeWidth="1"
            opacity={glowPulse * 0.6}
            filter="url(#glow)"
          />
        ))}

        <g transform={`translate(${width / 2}, ${height / 2}) rotate(${ringRotation})`}>
          <circle
            cx="0"
            cy="0"
            r={250 * circuitProgress}
            stroke={COLORS.industrialBlue}
            strokeWidth="2"
            fill="none"
            strokeDasharray="20,10"
            opacity={0.5}
          />
        </g>

        <circle
          cx={width / 2}
          cy={height / 2}
          r={180 * circuitProgress}
          stroke={COLORS.accentOrange}
          strokeWidth="3"
          fill="none"
          opacity={glowPulse}
          filter="url(#glow)"
        />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = width / 2 + Math.cos(rad) * 180 * circuitProgress;
          const y = height / 2 + Math.sin(rad) * 180 * circuitProgress;
          const nodeDelay = 45 + i * 5;
          const nodeOpacity = interpolate(frame, [nodeDelay, nodeDelay + 20], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });

          return (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill={COLORS.accentOrange} opacity={nodeOpacity} filter="url(#glow)" />
              <circle cx={x} cy={y} r="15" fill="none" stroke={COLORS.accentOrange} strokeWidth="1" opacity={nodeOpacity * 0.5} />
            </g>
          );
        })}
      </svg>

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            marginBottom: '1rem',
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="introGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.industrialBlue} />
                <stop offset="100%" stopColor={COLORS.accentOrange} />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#introGradient)"
              strokeWidth="3"
            />
            <text
              x="50"
              y="62"
              fill={COLORS.white}
              fontSize="40"
              fontFamily={fontFamily}
              fontWeight="800"
              textAnchor="middle"
            >
              SI
            </text>
          </svg>
        </div>

        <StaggeredText
          text={BRAND.name}
          fontSize={96}
          fontWeight="800"
          color={COLORS.white}
          delay={40}
          staggerDelay={3}
        />

        <GlowingLine width={600} delay={91} duration={50} />

        <div
          style={{
            opacity: interpolate(frame, [114, 148], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [114, 148], [30, 0], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            })}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: '500',
              color: COLORS.lightGray,
              fontFamily,
              textAlign: 'center',
            }}
          >
            Trusted Hardware Solutions Since 20+ Years
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
