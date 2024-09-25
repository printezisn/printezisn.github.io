import { Point } from 'pixi.js';
import config from '../config';
import gameState from '../game-state';
import TextComponent from '../components/text';
import ContainerComponent from '../components/container';

class LoadingScene extends ContainerComponent {
  constructor() {
    super({});

    this.addComponent(
      new TextComponent({
        text: 'Loading...',
        anchor: new Point(0.5, 0.5),
        fontFamily: config.loadingScene.fontFamily,
        fontSize: config.loadingScene.fontSize,
        textColor: config.loadingScene.textColor,
      }),
    );
  }

  protected onResize() {
    const text = this.components[0] as TextComponent;
    text.position = new Point(
      gameState.screen.width / 2,
      gameState.screen.height / 2,
    );
  }
}

export default LoadingScene;
