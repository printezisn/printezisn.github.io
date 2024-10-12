import type { Container } from 'pixi.js';

export interface DisplayObject {
  get object(): Container;
  set parent(parent: DisplayObject | null);
  destroy(): void;
}

export interface Point {
  x: number;
  y: number;
}

export interface BaseProps {
  position?: Point;
  anchor?: Point;
  scale?: Point;
  width?: number;
  height?: number;
  alpha?: number;
  horizontalAlignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'center' | 'bottom';
  margin?: Point;
  interactive?: boolean;
  cursor?: string;
}

export interface BaseSpriteProps extends BaseProps {
  resource: string;
}

export const basePropsToConfig = (props: BaseProps) => ({
  position: props.position,
  anchor: props.anchor,
  scale: props.scale,
  width: props.width,
  height: props.height,
  alpha: props.alpha,
  interactive: props.interactive,
  cursor: props.cursor,
});
