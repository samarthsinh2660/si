import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { StaggeredText } from '../components/StaggeredText';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { GlowingLine } from '../components/GlowingLine';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '600', '700'],
  subsets: ['latin'],
});

type PartItem = {
  name: string;
  icon: string;
  delay: number;
  color: string;
};

const parts: PartItem[] = [
  { name: 'RAM', icon: 'ram', delay: 34, color: COLORS.success },
  { name: 'SSD', icon: 'ssd', delay: 57, color: COLORS.industrialBlue },
  { name: 'Motherboard', icon: 'motherboard', delay: 80, color: COLORS.accentOrange },
  { name: 'Graphics', icon: 'gpu', delay: 103, color: COLORS.electricBlue },
  { name: 'Processor', icon: 'cpu', delay: 126, color: COLORS.brightOrange },
];

const PartIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  switch (type) {
    case 'ram':
      return (
        <svg width="70" height="50" viewBox="0 0 70 50">
          <rect x="5" y="10" width="60" height="25" rx="3" fill={color} opacity="0.8" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={10 + i * 9} y="15" width="6" height="15" rx="1" fill={COLORS.dark} />
          ))}
          <rect x="10" y="38" width="5" height="8" fill={color} opacity="0.6" />
          <rect x="55" y="38" width="5" height="8" fill={color} opacity="0.6" />
        </svg>
      );
    case 'ssd':
      return (
        <svg width="70" height="50" viewBox="0 0 70 50">
          <rect x="5" y="5" width="60" height="40" rx="4" fill={color} opacity="0.8" />
          <rect x="10" y="10" width="25" height="20" rx="2" fill={COLORS.dark} />
          <rect x="40" y="12" width="20" height="6" rx="1" fill={COLORS.white} opacity="0.5" />
          <rect x="40" y="22" width="20" height="6" rx="1" fill={COLORS.white} opacity="0.3" />
        </svg>
      );
    case 'motherboard':
      return (
        <svg width="70" height="50" viewBox="0 0 70 50">
          <rect x="5" y="5" width="60" height="40" rx="2" fill={color} opacity="0.8" />
          <rect x="10" y="10" width="15" height="15" rx="1" fill={COLORS.dark} />
          <rect x="30" y="8" width="10" height="20" rx="1" fill={COLORS.dark} />
          <circle cx="55" cy="20" r="8" fill={COLORS.dark} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={12 + i * 18} y="32" width="12" height="8" rx="1" fill={COLORS.dark} />
          ))}
        </svg>
      );
    case 'gpu':
      return (
        <svg width="70" height="50" viewBox="0 0 70 50">
          <rect x="5" y="8" width="60" height="30" rx="3" fill={color} opacity="0.8" />
          <rect x="10" y="12" width="40" height="22" rx="2" fill={COLORS.dark} />
          <circle cx="30" cy="23" r="8" fill={color} opacity="0.5" />
          <rect x="55" y="15" width="6" height="16" rx="1" fill={COLORS.dark} />
        </svg>
      );
    case 'cpu':
      return (
        <svg width="70" height="50" viewBox="0 0 70 50">
          <rect x="15" y="5" width="40" height="40" rx="3" fill={color} opacity="0.8" />
          <rect x="20" y="10" width="30" height="30" rx="2" fill={COLORS.dark} />
          {[0, 1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <rect x={5} y={12 + i * 8} width="8" height="4" fill={color} opacity="0.6" />
              <rect x={57} y={12 + i * 8} width="8" height="4" fill={color} opacity="0.6" />
            </React.Fragment>
          ))}
        </svg>
      );
    default:
      return null;
  }
};

export const Scene3HardwareSales: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
      }}
    >
      <BackgroundParticles count={40} color={COLORS.industrialBlue} direction="right" />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '2.5rem',
        }}
      >
        <StaggeredText
          text="Computer Hardware Sales"
          fontSize={56}
          fontWeight="700"
          color={COLORS.white}
          delay={12}
          staggerDelay={3}
        />

        <GlowingLine width={550} delay={51} duration={45} />

        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '1500px',
            marginTop: '1rem',
          }}
        >
          {parts.map((part, i) => {
            const cardProgress = spring({
              frame: Math.max(0, frame - part.delay),
              fps,
              config: SPRING_CONFIGS.gentle,
            });

            const hoverEffect = interpolate(
              (frame + i * 10) % 60,
              [0, 30, 60],
              [0, -5, 0],
              { extrapolateRight: 'clamp' }
            );

            const glowOpacity = interpolate(
              (frame + i * 15) % 45,
              [0, 22, 45],
              [0.3, 0.7, 0.3],
              { extrapolateRight: 'clamp' }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(frame, [part.delay, part.delay + 15], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  }),
                  transform: `translateY(${(1 - cardProgress) * 80 + hoverEffect}px) scale(${cardProgress})`,
                }}
              >
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: COLORS.darkBlue,
                    border: `3px solid ${part.color}60`,
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: `0 0 ${30 * glowOpacity}px ${part.color}40`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, transparent, ${part.color}, transparent)`,
                      opacity: glowOpacity,
                    }}
                  />

                  <PartIcon type={part.icon} color={part.color} />

                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: '600',
                      color: COLORS.white,
                      fontFamily,
                      textAlign: 'center',
                    }}
                  >
                    {part.name}
                  </div>

                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: part.color,
                      fontFamily,
                      padding: '0.3rem 0.8rem',
                      backgroundColor: `${part.color}20`,
                      borderRadius: '20px',
                    }}
                  >
                    Best Price
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '1rem',
            opacity: interpolate(frame, [154, 182], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [154, 182], [20, 0], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            })}px)`,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: '500',
              color: COLORS.lightGray,
              fontFamily,
            }}
          >
            Original Parts | Warranty Included
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
