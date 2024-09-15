import { Container } from 'pixi.js';
import BaseComponent from './base';
import type { DisplayObject, Point } from './types';

interface ContainerProps {
  position?: Point;
}

class ContainerComponent extends BaseComponent<Container> {
  private _components: DisplayObject[] = [];

  constructor(props: ContainerProps) {
    super(
      new Container({
        position: props.position,
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
  }

  removeComponent(component: DisplayObject) {
    const index = this.components.indexOf(component);
    if (index >= 0) {
      this.components.splice(index, 1);
      this.object.removeChildAt(index);
    }
  }

  removeComponents() {
    this.components = [];
    this.object.removeChildren();
  }
}

export default ContainerComponent;
