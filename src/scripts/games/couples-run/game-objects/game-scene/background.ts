import TilingBackgroundComponent from '../../../../../lib/game-engine/components/tiling-background';
import gameState from '../../game-state';

class Background extends TilingBackgroundComponent {
  constructor() {
    super({
      label: 'background',
      resource: 'city-bg.png',
    });
  }

  protected onTick() {
    if (!gameState.started) return;

    this.tilePosition.x -= gameState.speed;
  }
}

export default Background;
