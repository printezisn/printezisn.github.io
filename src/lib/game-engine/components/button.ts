import SpriteComponent from './sprite';
import type { BaseSpriteProps } from './types';

interface ButtonProps extends BaseSpriteProps {
  hoverResource: string;
}

class ButtonComponent extends SpriteComponent {
  private _pointerOver = false;

  constructor(props: ButtonProps) {
    super(props);

    this.object.on('pointerenter', this.onPointerEnter.bind(this));
    this.object.on('pointerout', this.onPointerOut.bind(this));
    this.object.on('pointerdown', this.onClick.bind(this));
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
    this.texture = this.defaultResource;
    await this.delay(0.1);
    if (this._pointerOver) {
      this.texture = this.hoverResource;
    }
  }
}

export default ButtonComponent;
