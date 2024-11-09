import { TilingBackgroundComponent } from '@printezisn/game-engine';
import config from '../../config';

class Background extends TilingBackgroundComponent {
  constructor() {
    super({
      label: 'background',
      resource: 'city-bg.png',
    });

    this.registerToSignal(config.signals.moveScreen, this._move);
  }

  private _move(x: number) {
    this.tilePosition.x = -x;
  }
}

export default Background;
