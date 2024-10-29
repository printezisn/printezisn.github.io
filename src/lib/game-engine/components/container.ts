import { Container } from 'pixi.js';
import BaseComponent from './base';
import { basePropsToConfig, type BaseProps, type DisplayObject } from './types';
import gameState from '../game-state';

class ContainerComponent extends BaseComponent<Container> {
  private _components: DisplayObject[] = [];

  constructor(props: BaseProps) {
    super(new Container(basePropsToConfig(props)), props);
  }

  private set components(components: DisplayObject[]) {
    this._components = components;
  }

  get components(): DisplayObject[] {
    return this._components;
  }

  addComponent<T extends DisplayObject>(component: T) {
    this.components.push(component);
    this.object.addChild(component.object);
    component.parent = this;

    return component;
  }

  removeComponent(component: DisplayObject) {
    const index = this.components.indexOf(component);
    if (index >= 0) {
      this.components[index].parent = null;
      this.components[index].destroy();
      this.components.splice(index, 1);
    }
  }

  removeComponents() {
    this.components.forEach((component) => {
      component.parent = null;
      component.destroy();
    });
    this.components = [];
  }

  destroy() {
    this.removeComponents();
    super.destroy();
  }

  positionToScreen() {
    if (this.props.horizontalAlignment === 'center') {
      this.x =
        (gameState.screen.width - (this.props.width ?? 0)) / 2 +
        (this.props.margin?.x ?? 0);
    } else if (this.props.horizontalAlignment === 'right') {
      this.x =
        gameState.screen.width -
        (this.props.width ?? 0) +
        (this.props.margin?.x ?? 0);
    }

    if (this.props.verticalAlignment === 'center') {
      this.y =
        (gameState.screen.height - (this.props.height ?? 0)) / 2 +
        (this.props.margin?.y ?? 0);
    } else if (this.props.verticalAlignment === 'bottom') {
      this.y =
        gameState.screen.height -
        (this.props.height ?? 0) +
        (this.props.margin?.y ?? 0);
    }
  }
}

export default ContainerComponent;
