import type { Container } from 'pixi.js';
import type { DisplayObject, Point } from './types';
import type ContainerComponent from './container';
import { addSignalListener, removeSignalListener } from '../signals';
import config from '../config';
import { Animation, type AnimationOptions } from '../animation';

abstract class BaseComponent<T extends Container> implements DisplayObject {
  private _object: T;
  private _parent: ContainerComponent | null = null;
  private _bindings: { name: string; binding: any }[] = [];
  private _animations: Animation[] = [];

  constructor(object: T) {
    this._object = object;

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

  async animate(options: AnimationOptions) {
    const animation = new Animation(options);
    this._animations.push(animation);

    await animation.start();

    const index = this._animations.indexOf(animation);
    this._animations.splice(index, 1);
  }

  stopAnimations() {
    this._animations.forEach((animation) => animation.stop());
    this._animations = [];
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
}

export default BaseComponent;
