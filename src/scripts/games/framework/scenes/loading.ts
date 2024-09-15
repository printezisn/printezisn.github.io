import { Point } from 'pixi.js';
import BaseScene from './base';
import config from '../config';
import gameState from '../game-state';
import TextComponent from '../components/text';

class LoadingScene extends BaseScene {
  private _text = new TextComponent({
    text: 'Loading',
    anchor: new Point(0.5, 0.5),
    fontFamily: config.loadingScene.fontFamily,
    fontSize: config.loadingScene.fontSize,
    textColor: config.loadingScene.textColor,
    strokeColor: config.loadingScene.strokeColor,
    strokeWidth: config.loadingScene.strokeThickness,
  });

  constructor() {
    super();

    this.container.addComponent(this._text);
  }

  protected onResize() {
    this._text.position = new Point(
      gameState.screen.width / 2,
      gameState.screen.height / 2,
    );
  }
}

export default LoadingScene;
