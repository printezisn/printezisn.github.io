import { Point, Text } from 'pixi.js';
import BaseScene from './base';
import config from '../config';
import gameState from '../game-state';

class LoadingScene extends BaseScene {
  private _text: Text;

  constructor() {
    super();

    this._text = new Text({
      text: 'Loading',
      anchor: new Point(0.5, 0.5),
      style: {
        fontFamily: config.loadingScene.fontFamily,
        fontSize: config.loadingScene.fontSize,
        fill: config.loadingScene.textColor,
        stroke: {
          color: config.loadingScene.strokeColor,
          width: config.loadingScene.strokeThickness,
        },
      },
    });

    this.container.addChild(this._text);
  }

  protected onResize() {
    this._text.position = new Point(
      gameState.screen.width / 2,
      gameState.screen.height / 2,
    );
  }
}

export default LoadingScene;
