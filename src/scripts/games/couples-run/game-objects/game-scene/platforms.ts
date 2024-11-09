import gameState from '../../game-state';
import Platform from './platform';
import Girl from './girl';
import Boy from './boy';
import config from '../../config';
import type Character from './character';
import {
  ContainerComponent,
  engineConfig,
  getRandomInt,
} from '@printezisn/game-engine';

class Platforms extends ContainerComponent {
  private _limit = 0;

  get character() {
    return this.components[0] as Character;
  }

  constructor() {
    super({
      label: 'platforms',
      verticalAlignment: 'bottom',
      height: 292,
    });

    this.addComponent(
      gameState.selectedCharacter === 'girl' ? new Girl() : new Boy(),
    );
    this._limit = this.addComponent(new Platform(2, 1000, 0)).width;
    this._createPlatforms();

    this.registerToSignal(config.signals.moveScreen, this._move);
  }

  private _move(x: number) {
    this.x = -x;
    this._deleteExpiredPlatforms();
    this._createPlatforms();
  }

  private _createPlatforms() {
    while (this._limit + this.x <= engineConfig.screen.width + 1000) {
      const totalLayers = getRandomInt(1, 8);
      const totalWidth = getRandomInt(200, 1500);
      const gap = getRandomInt(100, 200);

      this.addComponent(
        new Platform(totalLayers, totalWidth, this._limit + gap),
      );

      this._limit += gap + totalWidth;
    }
  }

  private _deleteExpiredPlatforms() {
    while (true) {
      const platform = this.components[1] as Platform;
      if (platform.x + platform.width + 100 < -this.x) {
        platform.destroy();
      } else {
        break;
      }
    }
  }
}

export default Platforms;
