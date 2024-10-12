import TilingBackgroundComponent from './tiling-background';
import type { BaseSpriteProps } from './types';

class MovingBackgroundComponent extends TilingBackgroundComponent {
  constructor(props: BaseSpriteProps) {
    super(props);
  }

  protected onTick() {
    this.tilePosition.x--;
  }
}

export default MovingBackgroundComponent;
