import type { Container } from 'pixi.js';
import type { BaseProps, DisplayObject, Point } from './types';
import type ContainerComponent from './container';
import { addSignalListener, removeSignalListener } from '../signals';
import config from '../config';
import { Animation, type AnimationOptions } from '../animation';
import gameState from '../game-state';

abstract class BaseComponent<T extends Container> implements DisplayObject {
  private _props: BaseProps;
  private _object: T;
  private _parent: ContainerComponent | null = null;
  private _bindings: { name: string; binding: any }[] = [];
  private _animations: Animation[] = [];

  constructor(object: T, props: BaseProps) {
    this._props = props;
    this._object = object;

    this.registerToSignal(config.signals.onResize, this.positionToScreen);
    if ((this as any).onResize) {
      this.registerToSignal(config.signals.onResize, (this as any).onResize);
    }
    if ((this as any).onOrientationChange) {
      this.registerToSignal(
        config.signals.onOrientationChange,
        (this as any).onOrientationChange,
      );
    }
    if ((this as any).onTick) {
      this.registerToSignal(config.signals.onTick, (this as any).onTick);
    }

    this.positionToScreen();
  }

  protected registerToSignal(name: string, callback: (...args: any[]) => void) {
    this._bindings.push(addSignalListener(name, callback.bind(this)));
  }

  protected unregisterFromSignal(name: string) {
    for (let i = 0; i < this._bindings.length; i++) {
      if (this._bindings[i].name === name) {
        removeSignalListener(name, this._bindings[i].binding);
        this._bindings.splice(i, 1);
        i--;
      }
    }
  }

  get object(): T {
    return this._object;
  }

  get x() {
    return this.object.x;
  }

  set x(x: number) {
    this.object.x = x;
  }

  get y() {
    return this.object.y;
  }

  set y(y: number) {
    this.object.y = y;
  }

  get position(): Point {
    return this.object.position;
  }

  set position(position: Point) {
    this.object.position = position;
  }

  set scale(scale: Point) {
    this.object.scale = scale;
  }

  get scale(): Point {
    return this.object.scale;
  }

  get scaleX(): number {
    return this.object.scale.x;
  }

  set scaleX(x: number) {
    this.object.scale.x = x;
  }

  get scaleY(): number {
    return this.object.scale.y;
  }

  set scaleY(y: number) {
    this.object.scale.y = y;
  }

  get width(): number {
    return this.object.width;
  }

  set width(width: number) {
    this.object.width = width;
  }

  get height(): number {
    return this.object.height;
  }

  set height(height: number) {
    this.object.height = height;
  }

  get alpha() {
    return this.object.alpha;
  }

  set alpha(alpha: number) {
    this.object.alpha = alpha;
  }

  get parent() {
    return this._parent;
  }

  set parent(container: ContainerComponent | null) {
    this._parent = container;
  }

  get interactive() {
    return this.object.interactive ?? false;
  }

  set interactive(interactive: boolean) {
    this.object.interactive = true;
  }

  animate(options: AnimationOptions) {
    return this._createAnimation(this, options);
  }

  stopAnimations() {
    this._animations.forEach((animation) => animation.stop());
    this._animations = [];
  }

  delay(duration: number) {
    return this._createAnimation(
      { x: 0 },
      {
        from: { x: 0 },
        to: { x: 1 },
        duration,
      },
    );
  }

  destroy() {
    this._bindings.forEach(({ name, binding }) =>
      removeSignalListener(name, binding),
    );
    this._bindings = [];

    this.stopAnimations();

    this.parent = null;
    this.object.destroy();
  }

  positionToScreen() {
    if (this._props.horizontalAlignment === 'center') {
      this.x = gameState.screen.width / 2 + (this._props.margin?.x ?? 0);
    } else if (this._props.horizontalAlignment === 'right') {
      this.x = gameState.screen.width + (this._props.margin?.y ?? 0);
    }

    if (this._props.verticalAlignment === 'center') {
      this.y = gameState.screen.height / 2 + (this._props.margin?.y ?? 0);
    } else if (this._props.verticalAlignment === 'bottom') {
      this.y = gameState.screen.height + (this._props.margin?.y ?? 0);
    }
  }

  private async _createAnimation(target: any, options: AnimationOptions) {
    const animation = new Animation(options);
    this._animations.push(animation);

    await animation.start(target);

    const index = this._animations.indexOf(animation);
    this._animations.splice(index, 1);
  }
}

export default BaseComponent;