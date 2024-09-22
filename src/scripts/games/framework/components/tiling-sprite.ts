import { Texture, TilingSprite } from 'pixi.js';
import BaseComponent from './base';
import { type BaseSpriteProps, type Point } from './types';

class TilingSpriteComponent extends BaseComponent<TilingSprite> {
  constructor(props: BaseSpriteProps) {
    super(
      new TilingSprite({
        texture: Texture.from(props.resource),
        position: props.position,
        anchor: props.anchor,
        scale: props.scale,
        width: props.width,
        height: props.height,
      }),
    );
  }

  get originalWidth() {
    return this.object.texture.width;
  }

  get originalHeight() {
    return this.object.texture.height;
  }

  get tileScale(): Point {
    return this.object.tileScale;
  }

  set tileScale(scale: Point) {
    this.object.tileScale = scale;
  }

  get tilePosition(): Point {
    return this.object.tilePosition;
  }

  set tilePosition(position: Point) {
    this.object.tilePosition = position;
  }
}

export default TilingSpriteComponent;
