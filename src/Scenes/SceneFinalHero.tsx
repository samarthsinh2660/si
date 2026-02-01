import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, BRAND, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { GlowingLine } from '../components/GlowingLine';
import { CircuitBackground } from '../components/CircuitBackground';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

export const SceneFinalHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const pulseGlow = interpolate(
    (frame % 45),
    [0, 22, 45],
    [0.5, 1, 0.5],
    { extrapolateRight: 'clamp' }
  );

  const buttonPulse = interpolate(
    (frame % 30),
    [0, 15, 30],
    [1, 1.05, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
      }}
    >
      <CircuitBackground opacity={0.12} />
      <BackgroundParticles count={60} color={COLORS.industrialBlue} />

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.industrialBlue}20 0%, transparent 60%)`,
          opacity: pulseGlow,
        }}
      />

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
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.industrialBlue} />
                <stop offset="100%" stopColor={COLORS.accentOrange} />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="4"
            />
            <text
              x="60"
              y="75"
              fill={COLORS.white}
              fontSize="50"
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
          delay={34}
          staggerDelay={3}
        />

        <GlowingLine width={700} delay={68} duration={50} />

        <div
          style={{
            opacity: interpolate(frame, [86, 114], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [86, 114], [20, 0], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            })}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: '600',
              color: COLORS.lightGray,
              fontFamily,
              textAlign: 'center',
            }}
          >
            {BRAND.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            opacity: interpolate(frame, [126, 154], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <div
            style={{
              padding: '1.25rem 2.5rem',
              backgroundColor: COLORS.accentOrange,
              borderRadius: '12px',
              transform: `scale(${buttonPulse})`,
              boxShadow: `0 0 ${30 * pulseGlow}px ${COLORS.accentOrange}80`,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32">
              <path
                d="M6 4h6l3 7-4 3c1.5 3 4 5.5 7 7l3-4 7 3v6c0 1.5-1.5 3-3 3C11 28 4 21 2 10c0-1.5 1.5-3 3-3"
                fill="none"
                stroke={COLORS.white}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: COLORS.white,
                fontFamily,
              }}
            >
              {BRAND.phone}
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
            opacity: interpolate(frame, [160, 188], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect x="2" y="2" width="24" height="24" rx="6" fill="#25D366" />
            <path
              d="M14 6c-4.4 0-8 3.6-8 8 0 1.4.4 2.7 1 3.9L6 22l4.2-1.1c1.1.6 2.4 1 3.8 1 4.4 0 8-3.6 8-8s-3.6-8-8-8z"
              fill={COLORS.white}
            />
          </svg>
          <span
            style={{
              fontSize: 22,
              color: COLORS.lightGray,
              fontFamily,
              fontWeight: '500',
            }}
          >
            WhatsApp Available
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '2rem',
            opacity: interpolate(frame, [188, 216], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          {['Laptop Repair', 'Hardware Sales', 'CCTV', 'Factory AMC'].map((text, i) => (
            <div
              key={i}
              style={{
                fontSize: 18,
                color: COLORS.gray,
                fontFamily,
                fontWeight: '500',
                padding: '0.5rem 1rem',
                border: `1px solid ${COLORS.industrialBlue}40`,
                borderRadius: '6px',
                transform: `translateY(${interpolate(
                  frame,
                  [188 + i * 8, 216 + i * 8],
                  [15, 0],
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
