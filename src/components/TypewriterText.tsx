import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../config/branding';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
});

type TypewriterTextProps = {
  text: string;
  delay?: number;
  charFrames?: number;
  fontSize?: number;
  color?: string;
  showCursor?: boolean;
  cursorColor?: string;
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  charFrames = 2,
  fontSize = 48,
  color = COLORS.white,
  showCursor = true,
  cursorColor = COLORS.accentOrange,
}) => {
  const frame = useCurrentFrame();
  const delayedFrame = Math.max(0, frame - delay);

  const typedChars = Math.min(text.length, Math.floor(delayedFrame / charFrames));
  const typedText = text.slice(0, typedChars);

  const cursorOpacity = interpolate(
    frame % 16,
    [0, 8, 16],
    [1, 0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        fontSize,
        color,
        fontFamily,
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <span>{typedText}</span>
      {showCursor && (
        <span
          style={{
            opacity: cursorOpacity,
            color: cursorColor,
            marginLeft: '2px',
          }}
        >
          |
        </span>
      )}
    </div>
  );
};
