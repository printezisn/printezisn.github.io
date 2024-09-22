import type { Container } from 'pixi.js';
import type { DisplayObject, Point } from './types';

abstract class BaseComponent<T extends Container> implements DisplayObject {
  private _object: T;

  constructor(object: T) {
    this._object = object;
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
}

export default BaseComponent;
