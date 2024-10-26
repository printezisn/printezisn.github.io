import config from '../config';
import { playSound } from '../sound';
import SpriteComponent from './sprite';
import type { BaseSpriteProps } from './types';

interface ButtonProps extends BaseSpriteProps {
  hoverResource: string;
}

class ButtonComponent extends SpriteComponent {
  private _pointerOver = false;

  constructor(props: ButtonProps) {
    super(props);
  }

  get props() {
    return super.props as ButtonProps;
  }

  protected get defaultResource() {
    return this.props.resource;
  }

  protected get hoverResource() {
    return this.props.hoverResource;
  }

  protected onPointerEnter() {
    this.texture = this.hoverResource;
    this._pointerOver = true;
  }

  protected onPointerOut() {
    this.texture = this.defaultResource;
    this._pointerOver = false;
  }

  protected async onClick() {
    playSound(config.sounds.click);
    this.texture = this.defaultResource;
    await this.delay(0.1);
    if (this._pointerOver) {
      this.texture = this.hoverResource;
    }
  }
}

export default ButtonComponent;
