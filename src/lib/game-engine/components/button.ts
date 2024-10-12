import SpriteComponent from './sprite';
import type { BaseSpriteProps } from './types';

interface ButtonProps extends BaseSpriteProps {
  hoverResource: string;
}

class ButtonComponent extends SpriteComponent {
  private _defaultResource: string;
  private _hoverResource: string;
  private _pointerOver = false;

  constructor(props: ButtonProps) {
    super(props);

    this._defaultResource = props.resource;
    this._hoverResource = props.hoverResource;

    this.object.on('pointerenter', this.onPointerEnter.bind(this));
    this.object.on('pointerout', this.onPointerOut.bind(this));
    this.object.on('pointerdown', this.onClick.bind(this));
  }

  protected onPointerEnter() {
    this.texture = this._hoverResource;
    this._pointerOver = true;
  }

  protected onPointerOut() {
    this.texture = this._defaultResource;
    this._pointerOver = false;
  }

  protected async onClick() {
    this.texture = this._defaultResource;
    await this.delay(0.1);
    if (this._pointerOver) {
      this.texture = this._hoverResource;
    }
  }
}

export default ButtonComponent;
