import { Text } from 'pixi.js';
import BaseComponent from './base';
import { basePropsToConfig, type BaseProps, type Point } from './types';

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
        ...basePropsToConfig(props),
        text: props.text,
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
      props,
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
