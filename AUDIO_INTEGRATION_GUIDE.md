# Audio Integration Guide - Shital Infotech Video

## Overview
Your voiceover audio (`audio.mp3`) has been successfully integrated with the Remotion video project. The audio plays throughout the entire video composition with optimized volume settings.

---

## Audio Setup

### File Location
- **Audio File:** `public/audio.mp3`
- **Format:** MP3 (standard audio format)
- **Codec:** Supports MP3, WAV, AAC, and other common formats

### Integration in Video.tsx
```tsx
<Audio
  src={staticFile('audio.mp3')}
  volume={0.85}
/>
```

**Parameters:**
- `src`: Points to the audio file using `staticFile()` for static asset imports
- `volume`: Set to 0.85 (85%) to ensure clear voiceover without overwhelming visuals
  - Range: 0 (mute) to 1 (full volume)

---

## Audio Timeline Sync

The voiceover is synced with the following scenes:

| Scene | Duration | Audio Content |
|-------|----------|---|
| Intro | 5s | Brand introduction |
| Problem | 4s | Problem statement |
| Solution | 4s | Solution teaser |
| Laptop Repair | 5s | Service description |
| Hardware Sales | 5s | Product offerings |
| Before/After | 5s | Performance benefits |
| CCTV | 6s | Security systems |
| Factory Contracts | 7s | Industrial expertise |
| Trust | 5s | Company reputation |
| Stats | 6s | Track record numbers |
| Final Hero | 6s | Call to action |

**Total Video Duration:** ~58-60 seconds (including transitions)

---

## Audio Best Practices (Remotion)

### 1. Volume Control
If you need to adjust volume for specific sections:

```tsx
<Audio
  src={staticFile('audio.mp3')}
  volume={(f) =>
    interpolate(f, [0, 1 * fps], [0, 0.85], { extrapolateRight: 'clamp' })
  }
/>
```

### 2. Trimming Audio (if needed)
Skip intro or outro sections:

```tsx
<Audio
  src={staticFile('audio.mp3')}
  trimBefore={2 * fps}  // Skip first 2 seconds
  trimAfter={5 * fps}   // End 5 seconds early
/>
```

### 3. Multiple Audio Tracks
Layer background music under voiceover:

```tsx
<Audio src={staticFile('voiceover.mp3')} volume={0.85} />
<Audio src={staticFile('background-music.mp3')} volume={0.3} loop />
```

### 4. Fade In/Out Effect
Dynamic volume for smooth fade:

```tsx
<Audio
  src={staticFile('audio.mp3')}
  volume={(f) => {
    const duration = 6 * fps;  // 6 second fade
    if (f < duration) return interpolate(f, [0, duration], [0, 0.85]);
    if (f > totalDuration - duration)
      return interpolate(f, [totalDuration - duration, totalDuration], [0.85, 0]);
    return 0.85;
  }}
/>
```

---

## How to Test

### In Remotion Studio
1. Run: `npm start`
2. Navigate to `ShitalInfotechVideo` composition
3. Press Play - you should hear the voiceover synced with visuals
4. Adjust `volume` property in `Video.tsx` if needed

### For Rendering
```bash
npm run build
```

The rendered video will include the audio at 0.85 volume level.

---

## Audio File Requirements

**For best results:**
- Format: MP3, WAV, AAC, or FLAC
- Sample Rate: 44.1kHz or 48kHz
- Bit Depth: 16-bit or 24-bit
- Mono or Stereo
- Duration: Match video duration (~56 seconds)

**Current Setup:**
- File: `public/audio.mp3`
- Volume: 85% (0.85)
- Playback: Start to finish, no trimming

---

## Advanced Audio Features

### Pitch Adjustment (Server-side rendering only)
```tsx
<Audio
  src={staticFile('audio.mp3')}
  toneFrequency={1.1}  // Slight pitch increase
/>
```
⚠️ Note: Pitch shifting only works during server-side rendering, not in preview.

### Looping Background Music
```tsx
<Audio
  src={staticFile('bg-music.mp3')}
  loop
  volume={0.3}
/>
```

### Muting Specific Sections
```tsx
<Audio
  src={staticFile('audio.mp3')}
  muted={frame >= 2 * fps && frame <= 4 * fps}  // Mute 2-4 seconds
/>
```

---

## Troubleshooting

### Audio not playing in preview
- Check that `public/audio.mp3` exists
- Verify file format is supported
- Try refreshing the Studio

### Audio out of sync with video
- Ensure audio duration matches (or exceeds) video duration
- Audio starts at frame 0, same as video
- Check scene timings in `branding.ts`

### Audio too loud/quiet
- Adjust `volume` parameter (0-1 range)
- Current setting: 0.85 is recommended
- Test different values: 0.7 (quieter), 0.9 (louder)

### Performance issues
- Audio processing is lightweight in Remotion
- If performance drops, reduce composition complexity instead

---

## Production Rendering

When rendering for final export:

```bash
npm run build
```

The audio will be automatically encoded with the video output.

**Output file will include:**
- All 11 scenes with transitions
- Synchronized voiceover at 85% volume
- Full 1920x1080 resolution
- 30fps frame rate

---

## Volume Reference

- **0.3** - Subtle background music
- **0.5** - Balanced mix with music + voiceover
- **0.85** - Current setting (clear voiceover focus)
- **1.0** - Maximum volume (rarely needed)

Your current setup (0.85) is optimized for voiceover clarity while maintaining professional audio levels.
