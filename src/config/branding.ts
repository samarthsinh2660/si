export const COLORS = {
  dark: '#0a0e1a',
  darkBlue: '#0f172a',
  navy: '#0c1929',
  industrialBlue: '#3b82f6',
  electricBlue: '#60a5fa',
  accentOrange: '#f97316',
  brightOrange: '#fb923c',
  white: '#ffffff',
  lightGray: '#e2e8f0',
  gray: '#94a3b8',
  circuit: '#1e40af',
  success: '#22c55e',
  danger: '#ef4444',
  glow: '#3b82f680',
};

export const BRAND = {
  name: 'Shital Infotech',
  tagline: 'Hardware Experts Since 20+ Years',
  phone: '+91 98251 99081',
  phoneClean: '9825199081',
};

export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
};

// Synced with audio timeline - Hardware to 33s, Before/After to 40.2s
export const SCENE_DURATIONS = {
  intro: Math.round(7.2 * VIDEO_CONFIG.fps),          // 7.2 seconds = 216 frames
  problem: Math.round(5.7 * VIDEO_CONFIG.fps),        // 5.7 seconds = 171 frames
  solution: Math.round(5.7 * VIDEO_CONFIG.fps),       // 5.7 seconds = 171 frames
  laptopRepair: Math.round(7.2 * VIDEO_CONFIG.fps),   // 7.2 seconds = 216 frames
  hardwareSales: Math.round(7.2 * VIDEO_CONFIG.fps),  // 7.2 seconds = 216 frames (→ 33s cumulative)
  beforeAfter: Math.round(7.2 * VIDEO_CONFIG.fps),    // 7.2 seconds = 216 frames (→ 40.2s cumulative)
  cctv: Math.round(8.6 * VIDEO_CONFIG.fps),           // 8.6 seconds = 258 frames
  factoryContracts: Math.round(10.0 * VIDEO_CONFIG.fps), // 10 seconds = 300 frames
  trust: Math.round(7.2 * VIDEO_CONFIG.fps),          // 7.2 seconds = 216 frames
  stats: Math.round(8.6 * VIDEO_CONFIG.fps),          // 8.6 seconds = 258 frames
  finalHero: Math.round(8.6 * VIDEO_CONFIG.fps),      // 8.6 seconds = 258 frames
};

// Smoother, longer transitions
export const TRANSITION_DURATION = 20;

export const SPRING_CONFIGS = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 12 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
  wobbly: { damping: 12, stiffness: 180 },
  gentle: { damping: 30, stiffness: 120 },
};
