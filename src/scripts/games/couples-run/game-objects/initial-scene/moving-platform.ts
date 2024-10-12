import ContainerComponent from '../../../../../lib/game-engine/components/container';
import TilingSpriteComponent from '../../../../../lib/game-engine/components/tiling-sprite';
import gameState from '../../../../../lib/game-engine/game-state';

const TOTAL_MIDDLE_PLATFORMS = 2;

class MovingPlatform extends ContainerComponent {
  constructor() {
    super({});

    this.addComponent(
      new TilingSpriteComponent({
        resource: 'platform-top.png',
      }),
    );
    this.addComponent(
      new TilingSpriteComponent({
        resource: 'platform-middle.png',
      }),
    );

    this.onResize();
  }

  protected get platformTop() {
    return this.components[0] as TilingSpriteComponent;
  }

  protected get platformMiddle() {
    return this.components[1] as TilingSpriteComponent;
  }

  protected onResize() {
    this.platformMiddle.width = gameState.screen.width;
    this.platformMiddle.height =
      this.platformMiddle.originalHeight * TOTAL_MIDDLE_PLATFORMS;
    this.platformMiddle.position.y =
      gameState.screen.height - this.platformMiddle.height;

    this.platformTop.width = gameState.screen.width;
    this.platformTop.position.y =
      gameState.screen.height -
      this.platformMiddle.height -
      this.platformTop.height;
  }

  protected onTick() {
    this.platformTop.tilePosition.x--;
    this.platformMiddle.tilePosition.x--;
  }
}

export default MovingPlatform;
