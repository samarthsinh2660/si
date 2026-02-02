import './index.css';
import { Composition, staticFile, type CalculateMetadataFunction } from 'remotion';
import { ShitalInfotechVideo } from './Video';
import { VIDEO_CONFIG, SCENE_DURATIONS, TRANSITION_DURATION } from './config/branding';
import { getAudioDuration } from './utils/getAudioDuration';

const numScenes = 11;
const numTransitions = numScenes - 1;

const totalDuration =
  SCENE_DURATIONS.intro +
  SCENE_DURATIONS.problem +
  SCENE_DURATIONS.solution +
  SCENE_DURATIONS.laptopRepair +
  SCENE_DURATIONS.hardwareSales +
  SCENE_DURATIONS.beforeAfter +
  SCENE_DURATIONS.cctv +
  SCENE_DURATIONS.factoryContracts +
  SCENE_DURATIONS.trust +
  SCENE_DURATIONS.stats +
  SCENE_DURATIONS.finalHero -
  TRANSITION_DURATION * numTransitions;

// Calculate metadata to match audio duration
const calculateMetadata: CalculateMetadataFunction<Record<string, unknown>> = async () => {
  try {
    const audioSrc = staticFile('audio.mp3');
    const audioDurationInSeconds = await getAudioDuration(audioSrc);
    const audioDurationInFrames = Math.ceil(audioDurationInSeconds * VIDEO_CONFIG.fps);

    console.log(`Audio duration: ${audioDurationInSeconds.toFixed(2)}s (${audioDurationInFrames} frames)`);
    console.log(`Video duration: ${(totalDuration / VIDEO_CONFIG.fps).toFixed(2)}s (${totalDuration} frames)`);

    // Use audio duration if available, otherwise fall back to calculated duration
    return {
      durationInFrames: audioDurationInFrames,
    };
  } catch (error) {
    console.error('Failed to get audio duration, using default:', error);
    return {
      durationInFrames: totalDuration,
    };
  }
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShitalInfotech"
        component={ShitalInfotechVideo}
        durationInFrames={totalDuration}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};
