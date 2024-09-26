import TilingSpriteComponent from '../../framework/components/tiling-sprite';
import gameState from '../../framework/game-state';

class MovingPlatform extends TilingSpriteComponent {
  constructor() {
    super({
      resource: 'platform-top.png',
    });

    this.onResize();
  }

  protected onResize() {
    this.width = gameState.screen.width;
    this.position.y = gameState.screen.height - this.originalHeight;
  }

  protected onTick() {
    this.tilePosition.x--;
  }
}

export default MovingPlatform;
