import React from 'react';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Audio } from '@remotion/media';
import { staticFile } from 'remotion';
import { SCENE_DURATIONS, TRANSITION_DURATION } from './config/branding';

import { Scene1Intro } from './Scenes/Scene1Intro';
import { SceneProblem } from './Scenes/SceneProblem';
import { SceneSolution } from './Scenes/SceneSolution';
import { Scene2LaptopRepair } from './Scenes/Scene2LaptopRepair';
import { Scene3HardwareSales } from './Scenes/Scene3HardwareSales';
import { SceneBeforeAfter } from './Scenes/SceneBeforeAfter';
import { Scene4CCTV } from './Scenes/Scene4CCTV';
import { Scene5FactoryContracts } from './Scenes/Scene5FactoryContracts';
import { Scene6Trust } from './Scenes/Scene6Trust';
import { SceneStats } from './Scenes/SceneStats';
import { SceneFinalHero } from './Scenes/SceneFinalHero';

export const ShitalInfotechVideo: React.FC = () => {
  // Smooth spring timing for elegant transitions
  const smoothTiming = springTiming({
    config: { damping: 200 },
    durationInFrames: TRANSITION_DURATION
  });

  // Slightly faster but still smooth
  const mediumTiming = linearTiming({
    durationInFrames: TRANSITION_DURATION - 5
  });

  return (
    <>
      {/* Audio Track - Synced with 72.8s video timeline */}
      <Audio
        src={staticFile('audio.mp3')}
        volume={0.85}
      />

      <TransitionSeries>
      {/* Scene 1: Intro */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
        <Scene1Intro />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={smoothTiming}
      />

      {/* Scene 2: Problem */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
        <SceneProblem />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: 'from-right' })}
        timing={mediumTiming}
      />

      {/* Scene 3: Solution */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.solution}>
        <SceneSolution />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={smoothTiming}
      />

      {/* Scene 4: Laptop Repair */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.laptopRepair}>
        <Scene2LaptopRepair />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={smoothTiming}
      />

      {/* Scene 5: Hardware Sales */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hardwareSales}>
        <Scene3HardwareSales />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={smoothTiming}
      />

      {/* Scene 6: Before/After */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.beforeAfter}>
        <SceneBeforeAfter />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-bottom' })}
        timing={smoothTiming}
      />

      {/* Scene 7: CCTV */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cctv}>
        <Scene4CCTV />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={smoothTiming}
      />

      {/* Scene 8: Factory Contracts */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.factoryContracts}>
        <Scene5FactoryContracts />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={smoothTiming}
      />

      {/* Scene 9: Trust */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.trust}>
        <Scene6Trust />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={smoothTiming}
      />

      {/* Scene 10: Stats */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.stats}>
        <SceneStats />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={smoothTiming}
      />

      {/* Scene 11: Final Hero CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.finalHero}>
        <SceneFinalHero />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    </>
  );
};
