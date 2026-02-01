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

export const Scene4CCTV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cameraRotation = interpolate(
    frame,
    [0, 60, 120, 150],
    [-30, 30, -20, 0],
    { extrapolateRight: 'clamp' }
  );

  const cableProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scanLineY = interpolate(
    (frame % 90),
    [0, 90],
    [0, 350],
    { extrapolateRight: 'clamp' }
  );

  const scanOpacity = interpolate(
    (frame % 90),
    [0, 45, 90],
    [0, 0.5, 0],
    { extrapolateRight: 'clamp' }
  );

  const recordingPulse = interpolate(
    (frame % 30),
    [0, 15, 30],
    [0.3, 1, 0.3],
    { extrapolateRight: 'clamp' }
  );

  const cameraScale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBlue,
      }}
    >
      <BackgroundParticles count={25} color={COLORS.industrialBlue} direction="left" />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <StaggeredText
          text="CCTV & Security Systems"
          fontSize={56}
          fontWeight="700"
          color={COLORS.white}
          delay={12}
          staggerDelay={3}
        />

        <div
          style={{
            position: 'relative',
            width: '950px',
            height: '420px',
          }}
        >
          <svg width="950" height="420" viewBox="0 0 950 420">
            <defs>
              <filter id="cctvGlow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={COLORS.accentOrange} />
                <stop offset="100%" stopColor={COLORS.industrialBlue} />
              </linearGradient>
            </defs>

            <rect
              x="125"
              y="50"
              width="700"
              height="320"
              rx="12"
              fill="none"
              stroke={COLORS.industrialBlue}
              strokeWidth="2"
              strokeDasharray="15,8"
              opacity={interpolate(frame, [60, 90], [0, 0.4], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })}
            />

            <rect
              x="125"
              y={50 + scanLineY}
              width="700"
              height="3"
              fill={COLORS.accentOrange}
              opacity={scanOpacity}
              filter="url(#cctvGlow)"
            />

            <g transform={`translate(475, 140) scale(${cameraScale})`}>
              <g transform={`rotate(${cameraRotation})`}>
                <rect
                  x="-50"
                  y="-30"
                  width="100"
                  height="60"
                  rx="10"
                  fill={COLORS.lightGray}
                  stroke={COLORS.industrialBlue}
                  strokeWidth="3"
                />

                <circle cx="0" cy="0" r="25" fill={COLORS.dark} />
                <circle cx="0" cy="0" r="18" fill={COLORS.industrialBlue} />
                <circle cx="0" cy="0" r="8" fill={COLORS.accentOrange} opacity={recordingPulse} filter="url(#cctvGlow)" />

                <rect x="-50" y="-45" width="15" height="20" rx="3" fill={COLORS.lightGray} />

                <circle cx="35" cy="-20" r="4" fill={COLORS.danger} opacity={recordingPulse} />
              </g>

              <rect x="-8" y="30" width="16" height="60" rx="4" fill={COLORS.lightGray} />
              <rect x="-25" y="85" width="50" height="10" rx="3" fill={COLORS.gray} />
            </g>

            <path
              d={`M 475 230 Q 280 ${230 + 80 * cableProgress} 150 ${200 + 150 * cableProgress}`}
              stroke="url(#cableGradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${450 * cableProgress}, 450`}
              strokeLinecap="round"
            />

            <path
              d={`M 475 230 Q 670 ${230 + 60 * cableProgress} 800 ${220 + 130 * cableProgress}`}
              stroke="url(#cableGradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${450 * cableProgress}, 450`}
              strokeLinecap="round"
            />

            <g
              opacity={interpolate(frame, [90, 110], [0, 1], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })}
            >
              <rect x="100" y="320" width="120" height="70" rx="8" fill={COLORS.dark} stroke={COLORS.industrialBlue} strokeWidth="2" />
              <rect x="110" y="330" width="100" height="40" rx="4" fill={COLORS.circuit} />
              <text x="160" y="355" fill={COLORS.white} fontSize="14" fontFamily={fontFamily} fontWeight="600" textAnchor="middle">NVR</text>
              <circle cx="200" cy="375" r="5" fill={COLORS.success} opacity={recordingPulse} />
              <text x="160" y="382" fill={COLORS.gray} fontSize="10" fontFamily={fontFamily} textAnchor="middle">Recording</text>
            </g>

            <g
              opacity={interpolate(frame, [100, 120], [0, 1], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })}
            >
              <rect x="730" y="320" width="120" height="70" rx="8" fill={COLORS.dark} stroke={COLORS.industrialBlue} strokeWidth="2" />
              <rect x="740" y="330" width="100" height="45" rx="4" fill={COLORS.circuit} />
              <text x="790" y="358" fill={COLORS.white} fontSize="12" fontFamily={fontFamily} textAnchor="middle">Live View</text>
              <circle cx="750" cy="385" r="3" fill={COLORS.success} />
              <text x="790" y="388" fill={COLORS.gray} fontSize="10" fontFamily={fontFamily} textAnchor="middle">Online</text>
            </g>

            {[
              { x: 200, y: 100 },
              { x: 750, y: 100 },
              { x: 200, y: 300 },
              { x: 750, y: 300 },
            ].map((pos, i) => {
              const nodeOpacity = interpolate(
                frame,
                [110 + i * 8, 125 + i * 8],
                [0, 1],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              );
              const nodePulse = interpolate(
                (frame + i * 15) % 45,
                [0, 22, 45],
                [0.5, 1, 0.5],
                { extrapolateRight: 'clamp' }
              );

              return (
                <g key={i} opacity={nodeOpacity}>
                  <circle cx={pos.x} cy={pos.y} r="12" fill={COLORS.accentOrange} opacity={nodePulse} filter="url(#cctvGlow)" />
                  <circle cx={pos.x} cy={pos.y} r="20" fill="none" stroke={COLORS.accentOrange} strokeWidth="2" opacity={nodePulse * 0.5} />
                </g>
              );
            })}
          </svg>
        </div>

        <GlowingLine width={600} delay={97} duration={50} />

        <div
          style={{
            display: 'flex',
            gap: '4rem',
            marginTop: '0.5rem',
          }}
        >
          {[
            { title: 'HD Cameras', subtitle: 'Night Vision', delay: 160 },
            { title: '24/7 Recording', subtitle: 'Cloud Backup', delay: 188 },
            { title: 'Mobile Access', subtitle: 'Remote Monitoring', delay: 216 },
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
                  textAlign: 'center',
                  opacity: interpolate(frame, [item.delay, item.delay + 15], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  }),
                  transform: `translateY(${(1 - itemProgress) * 30}px)`,
                }}
              >
                <div style={{ fontSize: 28, color: COLORS.accentOrange, fontWeight: '700', fontFamily }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 18, color: COLORS.lightGray, marginTop: '0.3rem', fontFamily }}>
                  {item.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
