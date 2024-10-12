import { Sprite, Texture } from 'pixi.js';
import BaseComponent from './base';
import { basePropsToConfig, type BaseSpriteProps } from './types';

class SpriteComponent extends BaseComponent<Sprite> {
  constructor(props: BaseSpriteProps) {
    super(
      new Sprite({
        ...basePropsToConfig(props),
        texture: Texture.from(props.resource),
      }),
      props,
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
