import config from '../config';
import gameState from '../game-state';
import TextComponent from '../components/text';
import ContainerComponent from '../components/container';

class LoadingScene extends ContainerComponent {
  private get text() {
    return this.components[0] as TextComponent;
  }

  constructor() {
    super({});

    this.addComponent(
      new TextComponent({
        text: 'Loading...',
        anchor: { x: 0.5, y: 0.5 },
        fontFamily: config.loadingScene.fontFamily,
        fontSize: config.loadingScene.fontSize,
        textColor: config.loadingScene.textColor,
      }),
    );
  }

  protected onResize() {
    this.text.position = {
      x: gameState.screen.width / 2,
      y: gameState.screen.height / 2,
    };
  }
}

export default LoadingScene;
