import TextComponent from '../../../../lib/game-engine/components/text';
import BaseScene from '../../../../lib/game-engine/scenes/base';
import engineConfig from '../../../../lib/game-engine/config';
import gameState from '../game-state';
import { fireSignal } from '../../../../lib/game-engine/signals';
import config from '../config';

class GameOverScene extends BaseScene {
  async init() {
    this.addComponent(
      new TextComponent({
        label: 'game-over',
        text: 'Game Over',
        fontFamily: engineConfig.loadingScene.fontFamily,
        fontSize: 48,
        textColor: engineConfig.loadingScene.textColor,
        anchor: { x: 0.5, y: 0.5 },
        horizontalAlignment: 'center',
        verticalAlignment: 'center',
        margin: { x: 0, y: -50 },
      }),
    );

    this.addComponent(
      new TextComponent({
        label: 'score',
        text: `Your score is ${gameState.score}`,
        fontFamily: engineConfig.loadingScene.fontFamily,
        fontSize: 28,
        textColor: engineConfig.loadingScene.textColor,
        anchor: { x: 0.5, y: 0.5 },
        horizontalAlignment: 'center',
        verticalAlignment: 'center',
        margin: { x: 0, y: 50 },
      }),
    );

    this.delay(2).then(() => fireSignal(config.signals.goToGame));
  }
}

export default GameOverScene;
