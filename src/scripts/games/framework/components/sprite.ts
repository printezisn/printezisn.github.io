import { Sprite, Texture } from 'pixi.js';
import BaseComponent from './base';
import { type BaseSpriteProps } from './types';

class SpriteComponent extends BaseComponent<Sprite> {
  constructor(props: BaseSpriteProps) {
    super(
      new Sprite({
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

  set texture(resource: string) {
    this.object.texture = Texture.from(resource);
  }
}

export default SpriteComponent;
