import '../../base';
import '../../../styles/games/couples-run/main.scss';
import { changeScene, initGame } from '../framework/application';
import { addSignalListener, removeSignalListener } from '../framework/signals';
import config from '../framework/config';
import InitialScene from './scenes/initial-scene';

import Lobster from '@fontsource/lobster/files/lobster-latin-400-normal.woff2';
import PressStart2P from '@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff2';

const destroyLoadingSceneBinding = addSignalListener(
  config.signals.destroyLoadingScene,
  () => {
    removeSignalListener(
      destroyLoadingSceneBinding.name,
      destroyLoadingSceneBinding.binding,
    );

    changeScene(new InitialScene());
  },
);

const urlParams = new URLSearchParams(window.location.search ?? '');

config.gameName = 'couples-run';
config.maxFPS = Number(urlParams.get('maxFPS')) || 60;
config.debug = Boolean(urlParams.get('debug'));
config.extraAssets = [
  { alias: 'Lobster', src: Lobster, data: { family: 'Lobster' } },
  {
    alias: 'PressStart2P',
    src: PressStart2P,
    data: { family: 'PressStart2P' },
  },
];

initGame();
