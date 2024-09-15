import { Text } from 'pixi.js';
import BaseComponent from './base';
import type { BaseProps, Point } from './types';

interface TextProps extends BaseProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  textColor: number;
  strokeColor?: number;
  strokeWidth?: number;
}

class TextComponent extends BaseComponent<Text> {
  constructor(props: TextProps) {
    super(
      new Text({
        text: props.text,
        position: props.position,
        anchor: props.anchor,
        style: {
          fontFamily: props.fontFamily,
          fontSize: props.fontSize,
          fill: props.textColor,
          stroke: {
            color: props.strokeColor,
            width: props.strokeWidth,
          },
        },
      }),
    );
  }

  get anchor(): Point {
    return this.object.anchor;
  }

  set anchor(anchor: Point) {
    this.object.anchor = anchor;
  }
}

export default TextComponent;
