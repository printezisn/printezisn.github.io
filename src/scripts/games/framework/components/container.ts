import { Container } from 'pixi.js';
import BaseComponent from './base';
import type { BaseProps, DisplayObject } from './types';

class ContainerComponent extends BaseComponent<Container> {
  private _components: DisplayObject[] = [];

  constructor(props: BaseProps) {
    super(
      new Container({
        position: props.position,
        scale: props.scale,
        width: props.width,
        height: props.height,
        alpha: props.alpha,
      }),
    );
  }

  private set components(components: DisplayObject[]) {
    this._components = components;
  }

  get components(): DisplayObject[] {
    return this._components;
  }

  addComponent(component: DisplayObject) {
    this.components.push(component);
    this.object.addChild(component.object);
    component.parent = this;
  }

  removeComponent(component: DisplayObject) {
    const index = this.components.indexOf(component);
    if (index >= 0) {
      this.components[index].destroy();
      this.components.splice(index, 1);
      this.object.removeChildAt(index);
    }
  }

  removeComponents() {
    this.components.forEach((component) => component.destroy());
    this.components = [];
    this.object.removeChildren();
  }

  destroy() {
    this.removeComponents();
    super.destroy();
  }
}

export default ContainerComponent;
