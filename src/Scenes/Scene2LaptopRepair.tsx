import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { GlowingLine } from '../components/GlowingLine';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '600', '700'],
  subsets: ['latin'],
});

export const Scene2LaptopRepair: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const laptopScale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const screenGlow = interpolate(
    (frame % 45),
    [0, 22, 45],
    [0.3, 0.8, 0.3],
    { extrapolateRight: 'clamp' }
  );

  const screwdriverRotate = interpolate(frame, [30, 60], [0, -45], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  const ssdSlide = interpolate(frame, [45, 70], [100, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const ramSnap = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const chipPulse = interpolate(
    (frame % 30),
    [0, 15, 30],
    [0.5, 1, 0.5],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBlue,
      }}
    >
      <BackgroundParticles count={30} color={COLORS.industrialBlue} direction="up" />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '650px',
            height: '380px',
            transform: `scale(${laptopScale})`,
          }}
        >
          <svg width="650" height="380" viewBox="0 0 650 380">
            <defs>
              <filter id="screenGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.industrialBlue} stopOpacity="0.1" />
                <stop offset="100%" stopColor={COLORS.accentOrange} stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <rect
              x="75"
              y="30"
              width="500"
              height="260"
              rx="12"
              fill={COLORS.dark}
              stroke={COLORS.industrialBlue}
              strokeWidth="4"
            />

            <rect
              x="95"
              y="50"
              width="460"
              height="220"
              rx="6"
              fill="url(#screenGradient)"
              stroke={COLORS.industrialBlue}
              strokeWidth="1"
              opacity={screenGlow}
              filter="url(#screenGlow)"
            />

            <circle cx="325" cy="40" r="3" fill={COLORS.accentOrange} opacity={screenGlow} />

            <rect
              x="75"
              y="300"
              width="500"
              height="25"
              rx="12"
              fill={COLORS.dark}
              stroke={COLORS.industrialBlue}
              strokeWidth="3"
            />

            <ellipse cx="325" cy="340" rx="200" ry="15" fill={COLORS.darkBlue} opacity="0.5" />

            <g
              opacity={interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}
              transform={`translate(120, 100) rotate(${screwdriverRotate}, 40, 60)`}
            >
              <rect x="35" y="10" width="10" height="80" rx="3" fill={COLORS.accentOrange} />
              <polygon points="40,90 30,110 50,110" fill={COLORS.lightGray} />
              <rect x="32" y="0" width="16" height="15" rx="3" fill={COLORS.brightOrange} />
            </g>

            <g
              transform={`translate(${380 + ssdSlide}, 120)`}
              opacity={interpolate(frame, [45, 55], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}
            >
              <rect x="0" y="0" width="120" height="60" rx="6" fill={COLORS.circuit} stroke={COLORS.industrialBlue} strokeWidth="2" />
              <rect x="10" y="15" width="40" height="30" rx="3" fill={COLORS.dark} />
              <rect x="60" y="10" width="50" height="15" rx="2" fill={COLORS.accentOrange} />
              <rect x="60" y="35" width="50" height="15" rx="2" fill={COLORS.accentOrange} opacity="0.7" />
              <text x="60" y="60" fill={COLORS.white} fontSize="10" fontFamily={fontFamily}>SSD 512GB</text>
            </g>

            <g
              transform={`translate(200, ${180 + (1 - ramSnap) * 50})`}
              opacity={interpolate(frame, [55, 65], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}
            >
              <rect x="0" y="0" width="150" height="25" rx="4" fill={COLORS.success} stroke={COLORS.industrialBlue} strokeWidth="2" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <rect key={i} x={10 + i * 17} y="5" width="12" height="15" rx="1" fill={COLORS.dark} />
              ))}
              <text x="75" y="40" fill={COLORS.white} fontSize="10" fontFamily={fontFamily} textAnchor="middle">RAM 16GB</text>
            </g>

            <g opacity={interpolate(frame, [70, 85], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}>
              <circle cx="180" cy="200" r="20" fill={COLORS.circuit} stroke={COLORS.accentOrange} strokeWidth="2" opacity={chipPulse} />
              <rect x="170" y="195" width="20" height="10" rx="2" fill={COLORS.accentOrange} opacity={chipPulse} />
            </g>
          </svg>
        </div>

        <StaggeredText
          text="Laptop & Computer Repair"
          fontSize={56}
          fontWeight="700"
          color={COLORS.white}
          delay={23}
          staggerDelay={3}
        />

        <GlowingLine width={500} delay={68} duration={45} />

        <div
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '0.5rem',
          }}
        >
          {[
            { text: 'Fast', delay: 97 },
            { text: 'Reliable', delay: 120 },
            { text: 'Doorstep Service', delay: 143 },
          ].map((item, i) => {
            const itemProgress = spring({
              frame: Math.max(0, frame - item.delay),
              fps,
              config: SPRING_CONFIGS.gentle,
            });

            return (
              <div
                key={i}
                style={{
                  fontSize: 28,
                  color: COLORS.accentOrange,
                  fontWeight: '600',
                  fontFamily,
                  opacity: interpolate(frame, [item.delay, item.delay + 10], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  }),
                  transform: `translateY(${(1 - itemProgress) * 30}px) scale(${itemProgress})`,
                }}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
