import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, BRAND } from '../config/branding';
import { AnimatedText } from '../components/AnimatedText';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseScale = interpolate(
    (frame % 30),
    [0, 15, 30],
    [1, 1.05, 1],
    { extrapolateRight: 'clamp' }
  );

  const buttonScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const glowOpacity = interpolate(
    (frame % 60),
    [0, 30, 60],
    [0.3, 0.7, 0.3],
    { extrapolateRight: 'clamp' }
  );

  const phoneIconProgress = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '2.5rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {[...Array(20)].map((_, i) => {
          const x = (i % 5) * 400 + 100;
          const y = Math.floor(i / 5) * 300 + 100;
          const opacity = interpolate(
            (frame + i * 10) % 120,
            [0, 60, 120],
            [0, 0.1, 0],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: COLORS.industrialBlue,
                opacity,
              }}
            />
          );
        })}
      </div>

      <AnimatedText
        text="Call Now for Fast Service"
        fontSize={72}
        fontWeight="800"
        color={COLORS.white}
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '1rem',
          transform: `scale(${buttonScale})`,
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '1.5rem 3rem',
            backgroundColor: COLORS.accentOrange,
            borderRadius: '16px',
            transform: `scale(${pulseScale})`,
            boxShadow: `0 0 ${40 * glowOpacity}px ${COLORS.accentOrange}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              style={{
                transform: `scale(${phoneIconProgress})`,
              }}
            >
              <path
                d="M8 5h8l4 9-5 4c2 4 5 7 9 9l4-5 9 4v8c0 2-2 4-4 4C14 36 4 26 2 12c0-2 2-4 4-4"
                fill="none"
                stroke={COLORS.white}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div
              style={{
                fontSize: 36,
                fontWeight: '700',
                color: COLORS.white,
                fontFamily,
              }}
            >
              {BRAND.phone}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '1rem',
          opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <rect x="2" y="2" width="32" height="32" rx="8" fill="#25D366" />
          <path
            d="M18 8c-5.5 0-10 4.5-10 10 0 1.8.5 3.4 1.3 4.9L8 28l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10s-4.5-10-10-10zm5.5 13.5c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.2-.4-.2-1-.3-1.8-.7-3.2-1.4-5.2-4.6-5.4-4.8-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.3-.3.5l-.5.5c-.2.2-.4.4-.2.7.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.5 2.9 1.7.3.2.5.1.7-.1.2-.2.8-1 1-1.3.2-.3.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.6.3.6.4.1.2.1 1-.2 1.6z"
            fill={COLORS.white}
          />
        </svg>

        <div
          style={{
            fontSize: 28,
            fontWeight: '600',
            color: COLORS.lightGray,
            fontFamily,
          }}
        >
          WhatsApp Available
        </div>
      </div>

      <div
        style={{
          marginTop: '2rem',
          opacity: interpolate(frame, [3 * fps, 3.5 * fps], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <AnimatedText
          text={BRAND.name}
          fontSize={48}
          fontWeight="700"
          color={COLORS.industrialBlue}
          delay={Math.round(3 * fps)}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          opacity: interpolate(frame, [3.5 * fps, 4 * fps], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: COLORS.lightGray,
            fontFamily,
            textAlign: 'center',
          }}
        >
          Laptop Repair | Hardware Sales | CCTV | Factory AMC
        </div>
      </div>
    </AbsoluteFill>
  );
};
