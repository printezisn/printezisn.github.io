import gameState from '../game-state';
import TilingSpriteComponent from './tiling-sprite';
import type { BaseSpriteProps } from './types';

class TilingBackgroundComponent extends TilingSpriteComponent {
  constructor(props: BaseSpriteProps) {
    super(props);

    this.onResize();
  }

  protected onResize() {
    this.width = gameState.screen.width;
    this.height = gameState.screen.height;

    const heightScale = gameState.screen.height / this.originalHeight;
    this.tileScale = { x: heightScale, y: heightScale };
  }
}

export default TilingBackgroundComponent;
