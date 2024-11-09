import gameState from '../game-state';
import config from '../config';
import {
  BaseScene,
  engineConfig,
  fireSignal,
  TextComponent,
} from '@printezisn/game-engine';

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
