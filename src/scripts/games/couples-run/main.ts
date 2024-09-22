import '../../base';
import '../../../styles/games/couples-run/main.scss';
import { changeScene, initGame } from '../framework/application';
import { addSignalListener, removeSignalListener } from '../framework/signals';
import config from '../framework/config';
import InitialScene from './scenes/initial-scene';

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

initGame('couples-run', document.body);
