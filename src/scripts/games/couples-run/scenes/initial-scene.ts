import BaseScene from '../../framework/scenes/base';
import TilingSpriteComponent from '../../framework/components/tiling-sprite';
import gameState from '../../framework/game-state';

class InitialScene extends BaseScene {
  private _bg = new TilingSpriteComponent({
    resource: 'city-bg.png',
  });
  private _platform = new TilingSpriteComponent({
    resource: 'platform-top.png',
  });

  constructor() {
    super();

    this.container.addComponent(this._bg);
    this.container.addComponent(this._platform);
    this.onResize();
  }

  protected onResize() {
    this._bg.width = gameState.screen.width;
    this._bg.height = gameState.screen.height;

    const heightScale = gameState.screen.height / this._bg.originalHeight;
    this._bg.tileScale = { x: heightScale, y: heightScale };

    this._platform.width = gameState.screen.width;
    this._platform.position.y =
      gameState.screen.height - this._platform.originalHeight;
  }

  protected onTick(deltaTime: number) {
    this._bg.tilePosition.x -= deltaTime * gameState.speed;
    this._platform.tilePosition.x -= deltaTime * gameState.speed;
  }
}

export default InitialScene;
