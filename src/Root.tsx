import './index.css';
import { Composition } from 'remotion';
import { ShitalInfotechVideo } from './Video';
import { VIDEO_CONFIG, SCENE_DURATIONS, TRANSITION_DURATION } from './config/branding';

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
      />
    </>
  );
};
