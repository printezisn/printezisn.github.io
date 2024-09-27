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
        scale: props.scale,
        width: props.width,
        height: props.height,
        style: {
          fontFamily: props.fontFamily,
          fontSize: props.fontSize,
          fill: props.textColor,
          stroke: props.strokeColor && {
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

  get fontSize() {
    return this.object.style.fontSize;
  }

  set fontSize(fontSize: number) {
    this.object.style.fontSize = fontSize;
  }
}

export default TextComponent;
