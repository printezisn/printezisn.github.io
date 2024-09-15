import type { Container } from 'pixi.js';

export interface DisplayObject {
  get object(): Container;
}

export interface Point {
  x: number;
  y: number;
}

export interface BaseProps {
  position?: Point;
  anchor?: Point;
}
