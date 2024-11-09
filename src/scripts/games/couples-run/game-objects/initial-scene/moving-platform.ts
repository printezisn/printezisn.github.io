import {
  ContainerComponent,
  engineGameState,
  TilingSpriteComponent,
} from '@printezisn/game-engine';

const TOTAL_MIDDLE_PLATFORMS = 2;

class MovingPlatform extends ContainerComponent {
  constructor() {
    super({
      label: 'moving-platform',
    });

    this.addComponent(
      new TilingSpriteComponent({
        label: 'moving-platform-top',
        resource: 'platform-top.png',
      }),
    );
    this.addComponent(
      new TilingSpriteComponent({
        label: 'moving-platform-middle',
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
    this.platformMiddle.width = engineGameState.screen.width;
    this.platformMiddle.height =
      this.platformMiddle.originalHeight * TOTAL_MIDDLE_PLATFORMS;
    this.platformMiddle.position.y =
      engineGameState.screen.height - this.platformMiddle.height;

    this.platformTop.width = engineGameState.screen.width;
    this.platformTop.position.y =
      engineGameState.screen.height -
      this.platformMiddle.height -
      this.platformTop.height;
  }

  protected onTick() {
    this.platformTop.tilePosition.x--;
    this.platformMiddle.tilePosition.x--;
  }
}

export default MovingPlatform;
