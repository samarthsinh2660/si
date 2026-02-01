import React, { ReactNode } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../config/branding';
import { BackgroundParticles } from './BackgroundParticles';
import { CircuitBackground } from './CircuitBackground';

type SceneWrapperProps = {
  children: ReactNode;
  backgroundColor?: string;
  showParticles?: boolean;
  showCircuit?: boolean;
  particleColor?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
  zoomEffect?: boolean;
};

export const SceneWrapper: React.FC<SceneWrapperProps> = ({
  children,
  backgroundColor = COLORS.dark,
  showParticles = true,
  showCircuit = false,
  particleColor = COLORS.industrialBlue,
  fadeIn = true,
  fadeOut = false,
  zoomEffect = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeInOpacity = fadeIn
    ? interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateRight: 'clamp' })
    : 1;

  const fadeOutOpacity = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - 0.5 * fps, durationInFrames],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 1;

  const zoom = zoomEffect
    ? interpolate(frame, [0, durationInFrames], [1, 1.05], { extrapolateRight: 'clamp' })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity: fadeInOpacity * fadeOutOpacity,
        transform: `scale(${zoom})`,
      }}
    >
      {showCircuit && <CircuitBackground opacity={0.1} />}
      {showParticles && <BackgroundParticles count={30} color={particleColor} />}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
