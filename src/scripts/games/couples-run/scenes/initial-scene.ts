import BaseScene from '../../framework/scenes/base';
import TilingSpriteComponent from '../../framework/components/tiling-sprite';
import gameState from '../../framework/game-state';

class InitialScene extends BaseScene {
  private _bg = new TilingSpriteComponent({
    resource: 'city-bg.png',
  });

  constructor() {
    super();

    this.container.addComponent(this._bg);
    this.onResize();
  }

  protected onResize() {
    this._bg.width = gameState.screen.width;
    this._bg.height = gameState.screen.height;

    const heightScale = gameState.screen.height / this._bg.originalHeight;
    this._bg.tileScale = { x: heightScale, y: heightScale };
  }

  protected onTick(deltaTime: number) {
    this._bg.tilePosition = {
      x: this._bg.tilePosition.x - deltaTime * gameState.speed,
      y: this._bg.tilePosition.y,
    };
  }
}

export default InitialScene;
