import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { COLORS, SPRING_CONFIGS } from '../config/branding';
import { AnimatedText } from '../components/AnimatedText';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700', '800'],
  subsets: ['latin'],
});

export const SceneBeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dividerProgress = interpolate(frame, [0, 57], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const beforeOpacity = interpolate(frame, [17, 51], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const afterOpacity = interpolate(frame, [63, 97], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const slowPulse = interpolate(
    (frame % 120),
    [0, 60, 120],
    [0.3, 0.6, 0.3],
    { extrapolateRight: 'clamp' }
  );

  const fastPulse = interpolate(
    (frame % 20),
    [0, 10, 20],
    [0.6, 1, 0.6],
    { extrapolateRight: 'clamp' }
  );

  const arrowProgress = spring({
    frame: Math.max(0, frame - 97),
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(135deg, ${COLORS.danger}10 0%, transparent 50%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(225deg, ${COLORS.success}10 0%, transparent 50%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '10%',
          bottom: '10%',
          width: '4px',
          background: `linear-gradient(180deg, transparent, ${COLORS.industrialBlue}, transparent)`,
          transform: `scaleY(${dividerProgress})`,
          transformOrigin: 'top',
        }}
      />

      <AbsoluteFill
        style={{
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            opacity: beforeOpacity,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: COLORS.danger,
              fontFamily,
            }}
          >
            BEFORE
          </div>

          <svg width="280" height="200" viewBox="0 0 280 200">
            <rect
              x="20"
              y="20"
              width="240"
              height="140"
              rx="8"
              fill={COLORS.darkBlue}
              stroke={COLORS.danger}
              strokeWidth="2"
              opacity={0.8}
            />
            <rect
              x="35"
              y="35"
              width="210"
              height="100"
              rx="4"
              fill={COLORS.dark}
            />

            <g opacity={slowPulse}>
              <rect x="50" y="55" width="80" height="8" rx="2" fill={COLORS.danger} opacity="0.5" />
              <rect x="50" y="75" width="120" height="8" rx="2" fill={COLORS.danger} opacity="0.3" />
              <rect x="50" y="95" width="60" height="8" rx="2" fill={COLORS.danger} opacity="0.4" />
            </g>

            <circle cx="200" cy="85" r="20" fill="none" stroke={COLORS.danger} strokeWidth="3" opacity="0.5" />
            <path
              d={`M 200 65 A 20 20 0 0 1 ${200 + 20 * Math.sin(frame * 0.05)} ${85 - 20 * Math.cos(frame * 0.05)}`}
              stroke={COLORS.danger}
              strokeWidth="3"
              fill="none"
            />

            <rect x="20" y="165" width="240" height="12" rx="6" fill={COLORS.darkBlue} />
          </svg>

          <div
            style={{
              fontSize: 24,
              color: COLORS.lightGray,
              fontFamily,
              textAlign: 'center',
            }}
          >
            Slow HDD
            <br />
            <span style={{ color: COLORS.danger, fontSize: 20 }}>Loading...</span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${arrowProgress})`,
            zIndex: 10,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill={COLORS.industrialBlue} />
            <path
              d="M 25 40 L 50 40 M 40 28 L 55 40 L 40 52"
              stroke={COLORS.white}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            opacity: afterOpacity,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: COLORS.success,
              fontFamily,
            }}
          >
            AFTER
          </div>

          <svg width="280" height="200" viewBox="0 0 280 200">
            <rect
              x="20"
              y="20"
              width="240"
              height="140"
              rx="8"
              fill={COLORS.darkBlue}
              stroke={COLORS.success}
              strokeWidth="2"
            />
            <rect
              x="35"
              y="35"
              width="210"
              height="100"
              rx="4"
              fill={COLORS.dark}
            />

            <g opacity={fastPulse}>
              <rect x="50" y="50" width="160" height="10" rx="3" fill={COLORS.success} />
              <rect x="50" y="70" width="140" height="10" rx="3" fill={COLORS.industrialBlue} />
              <rect x="50" y="90" width="180" height="10" rx="3" fill={COLORS.success} />
              <rect x="50" y="110" width="120" height="10" rx="3" fill={COLORS.industrialBlue} />
            </g>

            <rect x="20" y="165" width="240" height="12" rx="6" fill={COLORS.darkBlue} />
            <circle cx="35" cy="171" r="3" fill={COLORS.success} />
          </svg>

          <div
            style={{
              fontSize: 24,
              color: COLORS.lightGray,
              fontFamily,
              textAlign: 'center',
            }}
          >
            Fast SSD
            <br />
            <span style={{ color: COLORS.success, fontSize: 20 }}>10x Faster!</span>
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: interpolate(frame, [126, 160], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <AnimatedText
          text="Upgrade Your PC Today"
          fontSize={40}
          fontWeight="700"
          color={COLORS.white}
          delay={126}
        />
      </div>
    </AbsoluteFill>
  );
};
