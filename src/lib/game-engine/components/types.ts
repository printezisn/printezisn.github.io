import type { Container } from 'pixi.js';

export interface DisplayObject {
  get object(): Container;
  set parent(parent: DisplayObject | null);
  get label(): string;
  set visible(visible: boolean);
  get visible(): boolean;
  get position(): Point;
  destroy(): void;
}

export interface Point {
  x: number;
  y: number;
}

export interface BaseProps {
  label: string;
  position?: Point;
  anchor?: Point;
  scale?: Point;
  rotation?: number;
  width?: number;
  height?: number;
  alpha?: number;
  horizontalAlignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'center' | 'bottom';
  margin?: Point;
  interactive?: boolean;
  cursor?: string;
  visible?: boolean;
  tint?: number;
}

export interface BaseSpriteProps extends BaseProps {
  resource: string;
}

export interface BaseTextProps extends BaseProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  textColor: number;
  strokeColor?: number;
  strokeWidth?: number;
  lineHeight?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  align?: 'left' | 'center' | 'right' | 'justify';
  bitmap?: boolean;
}

export const basePropsToConfig = (props: BaseProps) => ({
  label: props.label,
  position: props.position,
  anchor: props.anchor,
  scale: props.scale,
  rotation: props.rotation,
  width: props.width,
  height: props.height,
  alpha: props.alpha,
  interactive: props.interactive,
  cursor: props.cursor,
  visible: props.visible,
  tint: props.tint,
});
