import TilingSpriteComponent from '../../framework/components/tiling-sprite';
import gameState from '../../framework/game-state';
import ContainerComponent from '../../framework/components/container';

class InitialScene extends ContainerComponent {
  private get bg() {
    return this.components[0] as TilingSpriteComponent;
  }

  private get platform() {
    return this.components[1] as TilingSpriteComponent;
  }

  constructor() {
    super({});

    this.addComponent(
      new TilingSpriteComponent({
        resource: 'city-bg.png',
      }),
    );
    this.addComponent(
      new TilingSpriteComponent({
        resource: 'platform-top.png',
      }),
    );
    this.onResize();
  }

  protected onResize() {
    this.bg.width = gameState.screen.width;
    this.bg.height = gameState.screen.height;

    const heightScale = gameState.screen.height / this.bg.originalHeight;
    this.bg.tileScale = { x: heightScale, y: heightScale };

    this.platform.width = gameState.screen.width;
    this.platform.position.y =
      gameState.screen.height - this.platform.originalHeight;
  }

  protected onTick() {
    this.bg.tilePosition.x--;
    this.platform.tilePosition.x--;
  }
}

export default InitialScene;
