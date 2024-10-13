import '../../base';
import '../../../styles/games/couples-run/main.scss';
import { changeScene, initGame } from '../../../lib/game-engine/application';
import {
  addSignalListener,
  removeSignalListener,
} from '../../../lib/game-engine/signals';
import engineConfig from '../../../lib/game-engine/config';
import InitialScene from './scenes/initial-scene';

import Lobster from '@fontsource/lobster/files/lobster-latin-400-normal.woff2';
import PressStart2P from '@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff2';
import config from './config';
import IntroScene from './scenes/intro-scene';

const destroyLoadingSceneBinding = addSignalListener(
  engineConfig.signals.destroyLoadingScene,
  () => {
    removeSignalListener(
      destroyLoadingSceneBinding.name,
      destroyLoadingSceneBinding.binding,
    );

    changeScene(new InitialScene());
  },
);

const showCreditsBinding = addSignalListener(
  engineConfig.signals.showCredits,
  () => {
    removeSignalListener(showCreditsBinding.name, showCreditsBinding.binding);
    document.getElementById('credits-link')?.click();
  },
);

const goToIntroBinding = addSignalListener(config.signals.goToIntro, () => {
  removeSignalListener(goToIntroBinding.name, goToIntroBinding.binding);
  changeScene(new IntroScene());
});

const urlParams = new URLSearchParams(window.location.search ?? '');

engineConfig.gameName = 'couples-run';
engineConfig.maxFPS = Number(urlParams.get('maxFPS')) || 60;
engineConfig.debug = Boolean(urlParams.get('debug'));
engineConfig.extraAssets = [
  { alias: 'Lobster', src: Lobster, data: { family: 'Lobster' } },
  {
    alias: 'PressStart2P',
    src: PressStart2P,
    data: { family: 'PressStart2P' },
  },
];

initGame();
