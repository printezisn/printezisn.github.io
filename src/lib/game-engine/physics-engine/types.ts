import type { DisplayObject } from '../components/types';

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Circle {
  x: number;
  y: number;
  radius: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface LinearMovement {
  velocity: Velocity;
}

export interface Movement {
  linearMovement?: LinearMovement;
}

export type Target = DisplayObject & { matterBody?: Matter.Body };

export interface PhysicalEntity {
  target: Target;
  rectangle?: Rectangle;
  circle?: Circle;
  surface?: boolean;
  movement?: Movement;
  onUpdatePosition?: (x: number, y: number, onGround: boolean) => any;
  onCollision?: (entity: DisplayObject) => any;
}
