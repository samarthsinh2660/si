import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { GlowingLine } from '../components/GlowingLine';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

export const Scene6Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const badgeRotate = interpolate(frame, [10, 40], [-15, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  const shieldProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const checkmarkProgress = interpolate(frame, [50, 75], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const glowPulse = interpolate(
    (frame % 60),
    [0, 30, 60],
    [0.4, 1, 0.4],
    { extrapolateRight: 'clamp' }
  );

  const starRotation = interpolate(frame, [0, 120], [0, 360], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBlue,
      }}
    >
      <BackgroundParticles count={40} color={COLORS.accentOrange} direction="up" maxSize={3} />

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% 40%, ${COLORS.accentOrange}15 0%, transparent 50%)`,
          opacity: glowPulse,
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
            position: 'relative',
            width: '320px',
            height: '380px',
            transform: `scale(${badgeScale}) rotate(${badgeRotate}deg)`,
          }}
        >
          <svg width="320" height="380" viewBox="0 0 320 380">
            <defs>
              <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.industrialBlue} />
                <stop offset="50%" stopColor={COLORS.electricBlue} />
                <stop offset="100%" stopColor={COLORS.accentOrange} />
              </linearGradient>
              <filter id="shieldGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={`M 160 20 L 290 75 L 290 200 Q 290 310 160 360 Q 30 310 30 200 L 30 75 Z`}
              fill="url(#shieldGradient)"
              stroke={COLORS.white}
              strokeWidth="4"
              opacity={shieldProgress}
              filter="url(#shieldGlow)"
            />

            <path
              d={`M 160 55 L 260 100 L 260 195 Q 260 285 160 325 Q 60 285 60 195 L 60 100 Z`}
              fill={COLORS.dark}
              opacity={shieldProgress}
            />

            <text
              x="160"
              y="160"
              fill={COLORS.accentOrange}
              fontSize="70"
              fontFamily={fontFamily}
              fontWeight="800"
              textAnchor="middle"
              opacity={interpolate(frame, [60, 80], [0, 1], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })}
            >
              20+
            </text>

            <text
              x="160"
              y="210"
              fill={COLORS.white}
              fontSize="28"
              fontFamily={fontFamily}
              fontWeight="600"
              textAnchor="middle"
              opacity={interpolate(frame, [70, 90], [0, 1], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })}
            >
              YEARS
            </text>

            <path
              d={`M 105 255 L 145 295 L 215 225`}
              stroke={COLORS.success}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={`${180 * checkmarkProgress}, 180`}
              filter="url(#shieldGlow)"
            />

            <g transform={`translate(160, 190) rotate(${starRotation})`}>
              {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 170;
                const y = Math.sin(rad) * 170;
                const starOpacity = interpolate(frame, [85 + i * 5, 100 + i * 5], [0, 1], {
                  extrapolateRight: 'clamp',
                  extrapolateLeft: 'clamp',
                });
                const starPulse = interpolate(
                  (frame + i * 12) % 45,
                  [0, 22, 45],
                  [0.5, 1, 0.5],
                  { extrapolateRight: 'clamp' }
                );

                return (
                  <polygon
                    key={i}
                    points={`${x},${y - 10} ${x + 4},${y - 4} ${x + 10},${y - 4} ${x + 5},${y + 2} ${x + 7},${y + 10} ${x},${y + 5} ${x - 7},${y + 10} ${x - 5},${y + 2} ${x - 10},${y - 4} ${x - 4},${y - 4}`}
                    fill={COLORS.accentOrange}
                    opacity={starOpacity * starPulse}
                    filter="url(#shieldGlow)"
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <StaggeredText
          text="Trusted by Businesses"
          fontSize={52}
          fontWeight="700"
          color={COLORS.white}
          delay={46}
          staggerDelay={3}
        />

        <GlowingLine width={450} delay={74} duration={45} />

        <div
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '1rem',
          }}
        >
          {[
            { title: 'Expert Team', icon: 'team', delay: 103 },
            { title: 'Quality Work', icon: 'quality', delay: 131 },
            { title: 'Fast Support', icon: 'support', delay: 160 },
          ].map((item, i) => {
            const cardProgress = spring({
              frame: Math.max(0, frame - item.delay),
              fps,
              config: SPRING_CONFIGS.gentle,
            });

            const cardOpacity = interpolate(
              frame,
              [item.delay, item.delay + 15],
              [0, 1],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );

            return (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '1.5rem 2.5rem',
                  backgroundColor: `${COLORS.dark}90`,
                  borderRadius: '16px',
                  border: `2px solid ${COLORS.industrialBlue}50`,
                  opacity: cardOpacity,
                  transform: `translateY(${(1 - cardProgress) * 40}px) scale(${cardProgress})`,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: '700', color: COLORS.accentOrange, fontFamily }}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
