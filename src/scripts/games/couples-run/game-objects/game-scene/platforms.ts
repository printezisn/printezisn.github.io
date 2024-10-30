import ContainerComponent from '../../../../../lib/game-engine/components/container';
import gameState from '../../game-state';
import Platform from './platform';
import engineConfig from '../../../../../lib/game-engine/config';
import { getRandomInt } from '../../../../../lib/game-engine/helpers/numbers';

class Platforms extends ContainerComponent {
  private _limit = 0;

  constructor() {
    super({
      label: 'platforms',
      verticalAlignment: 'bottom',
      height: 292,
    });

    this._limit = this.addComponent(new Platform(2, 1000, 0)).width;
    this._createPlatforms();
  }

  protected onTick() {
    if (!gameState.started) return;

    this.x -= gameState.speed;
    this._deleteExpiredPlatforms();
    this._createPlatforms();
  }

  private _createPlatforms() {
    while (this._limit + this.x <= engineConfig.screen.width + 1000) {
      const totalLayers = getRandomInt(1, 8);
      const totalWidth = getRandomInt(200, 1500);
      const gap = getRandomInt(100, 300);

      this.addComponent(
        new Platform(totalLayers, totalWidth, this._limit + gap),
      );

      this._limit += gap + totalWidth;
    }
  }

  private _deleteExpiredPlatforms() {
    while (true) {
      const platform = this.components[0] as Platform;
      if (platform.x + platform.width + 100 < -this.x) {
        platform.destroy();
      } else {
        break;
      }
    }
  }
}

export default Platforms;
